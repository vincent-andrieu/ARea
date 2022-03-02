import { env } from "process";

import TwitterApi, { SendTweetV2Params, TweetV2 } from "twitter-api-v2";
import User from "../classes/user.class";
import ARea from "../classes/area.class";
import { AReaSchema } from "@schemas/area.schema";
import { GithubResult, RSSResult, TwitchStreamResult, TwitterTweetResult, UnsplashPostResult, DiscordMessageResult } from "@models/ActionResult";
import { TwitterPostTweetConfig } from "@models/ReactionConfig";
import Action, { ActionType } from "@classes/action.class";
import { Utils } from "./utils";
import moment from "moment";

// doc :
// https://www.npmjs.com/package/twitter-v2
// https://github.com/plhery/node-twitter-api-v2#readme

// https://api.twitter.com/2/users/:id/tweets

export class TwitterService {

    private static _areaSchema = new AReaSchema();

    private static IsNewPost(area: ARea, postId: string): boolean {
        const last: TwitterTweetResult = area.trigger.outputs as TwitterTweetResult;

        if (!last)
            return false;
        if (last.lastTweetId == postId)
            return false;
        return true;
    }

    private static getClient(user: User): TwitterApi {

        if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY || !user.oauth?.twitter)
            throw "Invalid twitter credentials";
        return new TwitterApi({
            appKey: env.TWITTER_API_KEY,
            appSecret: env.TWITTER_API_SECRET_KEY,
            accessToken: user.oauth?.twitter?.accessToken,
            accessSecret: user.oauth?.twitter?.secretToken
        });
    }

    private static async setTweetInfos(area: ARea, tweet: TweetV2, username: string) {
        const result: TwitterTweetResult = area.trigger.outputs as TwitterTweetResult || {};

        result.text = tweet.text;
        result.username = username;
        result.lastTweetId = tweet.id;
        if (tweet.lang)
            result.lang = tweet.lang;
        if (tweet.geo && tweet.geo?.coordinates) {
            result.coordinates[0] = tweet.geo?.coordinates[0];
            result.coordinates[1] = tweet.geo?.coordinates[1];
        }
        if (tweet.created_at)
            result.created_at = tweet.created_at;
        if (tweet.public_metrics?.like_count !== undefined)
            result.like_count = tweet.public_metrics?.like_count;
        if (tweet.public_metrics?.quote_count !== undefined)
            result.quote_count = tweet.public_metrics?.quote_count;
        if (tweet.public_metrics?.reply_count !== undefined)
            result.reply_count = tweet.public_metrics?.reply_count;
        if (tweet.public_metrics?.retweet_count !== undefined)
            result.retweet_count = tweet.public_metrics?.retweet_count;
        area.trigger.outputs = result;
        await TwitterService._areaSchema.edit(area);
    }

    public static async GetUserLastTweet(user: User, area: ARea, username: string): Promise<boolean> {

        try {
            const client = TwitterService.getClient(user);
            if (!client)
                return false;
            const userTweeting = await client.v2.userByUsername(username);
            if (!userTweeting)
                return false;
            const userTimeline = await client.v2.userTimeline(userTweeting.data.id, {
                expansions: ["attachments.media_keys", "attachments.poll_ids", "referenced_tweets.id"],
                "media.fields": ["url"],
                "tweet.fields": ["created_at", "geo", "lang", "public_metrics"]
            });
            if (!userTimeline)
                return false;
            for await (const tweet of userTimeline) {
                if (tweet.referenced_tweets && tweet.referenced_tweets["type"] != "tweeted")
                    continue;
                if (!TwitterService.IsNewPost(area, tweet.id)) {
                    await this.setTweetInfos(area, tweet, username);
                    return false;
                }
                console.log("A new tweet is detected !", tweet);
                await this.setTweetInfos(area, tweet, username);
                break;
            }
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return false;
        }
        return true;
    }


    // Reactions

    private static async TweetATweet(tweet: SendTweetV2Params, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        try {
            await client.v2.tweet(tweet);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    private static async UpdateProfileBanner(imagePath: string, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        try {
            console.log("Start compression for: ", imagePath);
            await Utils.createCompressedImage(imagePath, 1500, 500);
            console.log("End compression for: ", imagePath);
            await client.v1.updateAccountProfileBanner(`/tmp/${imagePath}.webp`);
            console.log("End upload twitter image for: ", `/tmp/${imagePath}.webp`);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    private static async UpdateProfileImage(imagePath: string, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        try {
            console.log("Start compression for: ", imagePath);
            await Utils.createCompressedImage(imagePath);
            console.log("End compression for: ", imagePath);
            await client.v1.updateAccountProfileImage(`/tmp/${imagePath}.webp`);
            console.log("End upload twitter image for: ", `/tmp/${imagePath}.webp`);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    private static async rea_TweetTwitchStream(area: ARea): Promise<SendTweetV2Params> {
        const stream: TwitchStreamResult = area.trigger.outputs as TwitchStreamResult;
        const text = "there is a stream by " + stream.Username + " its named " + stream.StreamTitle;

        return { text: text };
    }

    private static async rea_TweetTweet(area: ARea): Promise<SendTweetV2Params> {
        const text: TwitterPostTweetConfig = area.consequence.inputs as TwitterPostTweetConfig;

        return { text: text.message };
    }

    private static async rea_TweetUnsplashPost(area: ARea, client: TwitterApi): Promise<SendTweetV2Params> {
        const post: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult;
        const mediaIds = await Promise.all([client.v1.uploadMedia(`/tmp/${post.downloadPath}.webp`)]);
        const text = post.username + " just posted a new picture on unsplash ! " + post.link;
        const tweet: SendTweetV2Params = { text: text, media: { media_ids: mediaIds } };

        return tweet;
    }
    private static async rea_TweetUnsplashRandomPost(area: ARea, client: TwitterApi): Promise<SendTweetV2Params> {
        const post: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult;
        const mediaIds = await Promise.all([client.v1.uploadMedia(`/tmp/${post.downloadPath}.webp`)]);
        const text = "Here is a picture from unsplash !" + post.link;
        const tweet: SendTweetV2Params = { text: text, media: { media_ids: mediaIds } };

        return tweet;
    }

    private static async rea_TweetGithub(area: ARea, type: string): Promise<SendTweetV2Params> {
        const github: GithubResult = area.trigger.outputs as GithubResult;
        const text = `New github ${type} on ${github.owner}/${github.repository} ${github.url}`;

        return { text: text};
    }

    private static async rea_TweetRSS(area: ARea): Promise<SendTweetV2Params> {
        const rss: RSSResult = area.trigger.outputs as RSSResult;
        const text = `There is an update on this RSS flux ${rss.url}`;

        return { text: text};
    }

    private static async rea_TweetToTweet(area: ARea): Promise<SendTweetV2Params> {
        const twitter: TwitterTweetResult = area.trigger.outputs as TwitterTweetResult;
        const text = `New twet by @${twitter.username}: ${twitter.text}`;

        return { text: text};
    }

    private static async rea_discordLine(area: ARea): Promise<SendTweetV2Params> {
        const discord: DiscordMessageResult = area.trigger.outputs as DiscordMessageResult;
        const text = `New discord message (channel : ${discord.channelId}) : ${discord.message}`;

        return { text: text};
    }

    public static async rea_Tweet(area: ARea, user: User) {
        const client: TwitterApi = TwitterService.getClient(user);
        const action: Action = area.trigger.action as Action;
        let tweet: SendTweetV2Params | null = null;

        try {

            switch (action.type) {
            case ActionType.TWITTER_MSG:
                tweet = await TwitterService.rea_TweetToTweet(area);
                break;
            case ActionType.GITHUB_ISSUE:
                tweet = await TwitterService.rea_TweetGithub(area, "issue");
                break;
            case ActionType.GITHUB_PULL_REQ:
                tweet = await TwitterService.rea_TweetGithub(area, "pull request");
                break;
            case ActionType.DISCORD_MSG:
                tweet = await TwitterService.rea_discordLine(area);
                break;
            case ActionType.RSS_ENTRY:
                tweet = await TwitterService.rea_TweetRSS(area);
                break;
            case ActionType.UNSPLASH_POST:
                tweet = await TwitterService.rea_TweetUnsplashPost(area, client);
                break;
            case ActionType.UNSPLASH_RANDOM_POST:
                tweet = await TwitterService.rea_TweetUnsplashRandomPost(area, client);
                break;
            case ActionType.TWITCH_STREAM:
                tweet = await TwitterService.rea_TweetTwitchStream(area);
                break;
            default:
                tweet = await TwitterService.rea_TweetTweet(area);
            }
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return;
        }

        if (tweet) {
            console.log("tweet will be :", tweet);
            TwitterService.TweetATweet(tweet, user);
        }

    }
    private static async rea_UnsplashPost(area: ARea): Promise<string> {
        const post: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult;

        return post.downloadPath;
    }

    private static async rea_TwitchStream(area: ARea): Promise<string> {
        const stream: TwitchStreamResult = area.trigger.outputs as TwitchStreamResult;
        const filepath = stream.StreamTitle;

        Utils.DownloadUrl(stream.StreamThumbnailUrl, filepath);
        return filepath;
    }

    public static async rea_UpdateBanner(area: ARea, user: User) {
        const action: Action = area.trigger.action as Action;
        let imagePath: string | null = null;

        try {

            switch (action.type) {
            case ActionType.UNSPLASH_POST:
                imagePath = await TwitterService.rea_UnsplashPost(area);
                break;
            case ActionType.UNSPLASH_RANDOM_POST:
                imagePath = await TwitterService.rea_UnsplashPost(area);
                break;
            case ActionType.TWITCH_STREAM:
                imagePath = await TwitterService.rea_TwitchStream(area);
                break;
            default:
                console.log("for this action create default banner");
            }
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return;
        }

        if (imagePath) {
            console.log("new banner will be :", imagePath);
            TwitterService.UpdateProfileBanner(imagePath, user);
        }

    }

    public static async rea_UpdatePP(area: ARea, user: User) {
        const action: Action = area.trigger.action as Action;
        let imagePath: string | null = null;

        try {
            switch (action.type) {
            case ActionType.UNSPLASH_POST:
                imagePath = await TwitterService.rea_UnsplashPost(area);
                break;
            case ActionType.UNSPLASH_RANDOM_POST:
                imagePath = await TwitterService.rea_UnsplashPost(area);
                break;
            case ActionType.TWITCH_STREAM:
                imagePath = await TwitterService.rea_TwitchStream(area);
                break;
            default:
                console.log("for this action create default pp");
            }
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return;
        }

        if (imagePath) {
            console.log("new PP will be :", imagePath);
            TwitterService.UpdateProfileImage(imagePath, user);
        }

    }

    public static parseProfileUser(json) {
        const profile = {
            id: "",
            id_str: "",
            username: "",
            displayName: "",
            emails: [{ value: "" }],
            photos: [{ value: "" }],
            provider: "",
            _raw: "",
            _json: {},
            _accessLevel: "read-write"
        };

        profile.id = String(json.id);
        if (json.id_str)
            profile.id = json.id_str;
        profile.username = json.screen_name;
        profile.displayName = json.name;
        if (json.email)
            profile.emails = [{ value: json.email }];
        profile.photos = [{ value: json.profile_image_url_https }];
        profile.provider = "twitter";
        profile._raw = JSON.stringify(json);
        profile._json = json;
        return profile;
    }
}