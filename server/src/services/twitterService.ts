import { env } from "process";

import TwitterApi, { TweetV2, UserV2Result } from "twitter-api-v2";
import User from "../classes/user.class";
import ARea from "../classes/area.class";
import { TwitterTweetResult } from "model/ActionResult";
import { TwitterTweetConfig } from "model/ActionConfig";

// doc :
// https://www.npmjs.com/package/twitter-v2
// https://github.com/plhery/node-twitter-api-v2#readme

// https://api.twitter.com/2/users/:id/tweets

export class TwitterService {

    private static getClient(user: User) {

        if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY || !user.oauth.twitter)
            throw "Invalid twitter credentials";
        return new TwitterApi({
            appKey: env.TWITTER_API_KEY,
            appSecret: env.TWITTER_API_SECRET_KEY,
            accessToken: user.oauth.twitter?.accessToken,
            accessSecret: user.oauth.twitter?.secretToken
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
            const inputs = area.trigger.inputs as TwitterTweetConfig;

            this.setTweetInfos(area, tweet);
            if (inputs.lastTweetId == tweet.id)
                return false;
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
}