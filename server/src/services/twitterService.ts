/* eslint-disable indent */
import { env } from "process";

import TwitterApi, { SendTweetV2Params, TweetV2, UserV2Result } from "twitter-api-v2";
import User from "../classes/user.class";
import ARea from "../classes/area.class";
import { TwitchStreamResult, TwitterTweetResult, UnsplashPostResult } from "@models/ActionResult";
import { TwitchStreamConfig, TwitterTweetConfig } from "models/ActionConfig";
import Action, { ActionType } from "@classes/action.class";
import { utils } from "./utils";
import { twitterConfig } from "@config/twitterConfig";
import axios from "axios";

// doc :
// https://www.npmjs.com/package/twitter-v2
// https://github.com/plhery/node-twitter-api-v2#readme

// https://api.twitter.com/2/users/:id/tweets

export class TwitterService {

    private static IsNewPost(area: ARea, postId: string): boolean {
        const last: TwitterTweetResult = area.trigger.outputs as TwitterTweetResult;

        if (last.lastTweetId == postId)
            return false;
        last.lastTweetId = postId;
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

    private static getClientAfterAuth(accessToken: string, secretToken: string) {

        if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY)
            throw "Invalid twitter credentials";
        return new TwitterApi({
            appKey: env.TWITTER_API_KEY,
            appSecret: env.TWITTER_API_SECRET_KEY,
            accessToken: accessToken,
            accessSecret: secretToken
        });
    }

    private static setTweetInfos(area: ARea, tweet: TweetV2) {
        const result: TwitterTweetResult = area.trigger.outputs as TwitterTweetResult;

        result.text = tweet.text;
        if (tweet.lang)
            result.lang = tweet.lang;
        if (tweet.geo && tweet.geo?.coordinates) {
            result.coordinates[0] = tweet.geo?.coordinates[0];
            result.coordinates[1] = tweet.geo?.coordinates[1];
        }
        if (tweet.created_at)
            result.created_at = tweet.created_at;
        if (tweet.public_metrics && tweet.public_metrics.like_count)
            result.like_count = tweet.public_metrics?.like_count;
        if (tweet.public_metrics?.quote_count)
            result.quote_count = tweet.public_metrics?.quote_count;
        if (tweet.public_metrics?.reply_count)
            result.reply_count = tweet.public_metrics?.reply_count;
        if (tweet.public_metrics?.retweet_count)
            result.retweet_count = tweet.public_metrics?.retweet_count;
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
                "media.fields": ["url"]
            });
            if (!userTimeline)
                return false;
            for await (const tweet of userTimeline) {
                if (tweet.referenced_tweets && tweet.referenced_tweets["type"] != "tweeted")
                    continue;

                if (!TwitterService.IsNewPost(area, tweet.id))
                    return false;

                this.setTweetInfos(area, tweet);

                const inputs = area.trigger.inputs as TwitterTweetResult;

                inputs.lastTweetId = tweet.id;
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
            client.v2.tweet(tweet);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    private static async UpdateProfileBanner(imagePath: string, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        try {
            client.v1.updateAccountProfileBanner(imagePath);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    private static async UpdateProfileImage(imagePath: string, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        try {
            client.v1.updateAccountProfileImage(imagePath);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    private static async rea_TweetTwitchStream(area: ARea, client: TwitterApi): Promise<SendTweetV2Params> {
        const stream: TwitchStreamResult = area.trigger.outputs as TwitchStreamResult;
        const text = "there is a stream by " + stream.Username + " its named " + stream.StreamTitle;

        return { text: text };
    }

    private static async rea_TweetUnsplashPost(area: ARea, client: TwitterApi): Promise<SendTweetV2Params> {
        const post: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult;
        const mediaIds = await Promise.all([
            // https://github.com/PLhery/node-twitter-api-v2/blob/f4b468171907b28d6a2924b0c03b05d05a5b13d5/test/media-upload.test.ts
            client.v1.uploadMedia(post.downloadPath)
        ]);
        const text = post.username + " just posted a new picture on splash !";
        const tweet: SendTweetV2Params = { text: text, media: { media_ids: mediaIds } };

        return tweet;
    }

    public static async rea_Tweet(area: ARea, user: User) {
        const client: TwitterApi = TwitterService.getClient(user);
        const action: Action = area.trigger.action as Action;
        let tweet: SendTweetV2Params | null = null;

        try {

            switch (action.type) {
                case ActionType.UNSPLASH_POST:
                    tweet = await TwitterService.rea_TweetUnsplashPost(area, client);
                    console.log("action was unsplash post");
                    break;
                case ActionType.TWITCH_STREAM:
                    tweet = await TwitterService.rea_TweetTwitchStream(area, client);
                    break;
                default:
                    console.log("todo upload file from parameter given");

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
        const filepath = "/tmp/" + stream.StreamTitle;

        utils.DownloadUrl(stream.StreamThumbnailUrl, filepath);
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
                    console.log("todo: default action");

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
                    console.log("todo: default action");

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

    public static async GetProfileInfo(accessToken: string, secretToken: string): Promise<object> {
        const client = TwitterService.getClientAfterAuth(accessToken, secretToken);

        const userProfile = await client.v1.verifyCredentials({
            include_entities: true,
            skip_status: false,
            include_email: false
        });
        const profile = TwitterService.parseProfileUser(userProfile);
        return profile;
    }

    public static async getAccessToken(oauthToken: string, oauthVerifier): Promise<any> {
        const twitterConsumerKey = twitterConfig.consumerKey;

        const url = "https://api.twitter.com/oauth/access_token";
        const params = new URLSearchParams();
        params.append("oauth_consumer_key", twitterConsumerKey);
        params.append("oauth_token", oauthToken);
        params.append("oauth_verifier", oauthVerifier);

        try {
            const response = await axios.post(`${url}?${params}`);
            const responseParams = new URLSearchParams(response.data);

            return {
                oauth_token: responseParams.get("oauth_token"),
                oauth_token_secret: responseParams.get("oauth_token_secret"),
                user_id: responseParams.get("user_id"),
                screen_name: responseParams.get("screen_name")
            };
        } catch (error) {
            console.log("[TWITTER] getAccessToken: ", (error as Error).toString());
            return {};
        }
    }
}