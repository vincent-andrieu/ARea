import { env } from "process";

import TwitterApi, { TweetV2, UserV2Result } from "twitter-api-v2";
import User from "../classes/user.class";
import ARea from "../classes/area.class";
import { TwitterTweetResult } from "model/ActionResult";
import { TwitterTweetConfig } from "model/ActionConfig";
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

    private static getClient(user: User) {

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
        const client = TwitterService.getClient(user);

        try {
            const userTweeting = await client.v2.userByUsername(username);
            const userTimeline = await client.v2.userTimeline(userTweeting.data.id, {
                expansions: ["attachments.media_keys", "attachments.poll_ids", "referenced_tweets.id"],
                "media.fields": ["url"]
            });
            if (!userTimeline || !userTimeline[0])
                return false;
            const tweet = userTimeline[0];

            if (tweet.referenced_tweets && tweet.referenced_tweets["type"] != "tweeted")
                return false;
            const inputs = area.trigger.inputs as TwitterTweetResult;

            if (!TwitterService.IsNewPost(area, tweet.id))
                return false;
            this.setTweetInfos(area, tweet);
            inputs.lastTweetId = tweet.id;
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return false;
        }
        return true;
    }

    public static async TweetATweet(text: string, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        try {
            client.v2.tweet(text);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    public static async UpdateProfileBanner(imagePath: string, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        try {
            client.v1.updateAccountProfileBanner(imagePath);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    public static async UpdateProfileImage(imagePath: string, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        try {
            client.v1.updateAccountProfileImage(imagePath);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    public static parseProfileUser(json) {
        const profile = {
            id: "",
            id_str: "",
            username: "",
            displayName: "",
            emails: [{value: ""}],
            photos: [{value: ""}],
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