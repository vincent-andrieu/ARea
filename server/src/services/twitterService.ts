import { env } from "process";

import TwitterApi from "twitter-api-v2";
import User from "../classes/user.class";

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

    public static async GetUserLastTweet(username: string, user: User): Promise<boolean> {
        const client = TwitterService.getClient(user);
        const userTweeting = await client.v2.userByUsername(username);
        const userTimeline = await client.v2.userTimeline(userTweeting.data.id, {
            expansions: ["attachments.media_keys", "attachments.poll_ids", "referenced_tweets.id"],
            "media.fields": ["url"]
        });
        const tweet = userTimeline[0];

        if (tweet.referenced_tweets && tweet.referenced_tweets["type"] != "tweeted")
            return false;
        // TODO: tweet is new if :
        //      if id is different than last
        // or
        //      web hook
        return true;
    }

    public static async TweetATweet(text: string, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        client.v2.tweet(text);
    }

    public static async UpdateProfileBanner(imagePath: string, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        client.v1.updateAccountProfileBanner(imagePath);
    }

    public static async UpdateProfileImage(imagePath: string, user: User): Promise<void> {
        const client = TwitterService.getClient(user);

        client.v1.updateAccountProfileImage(imagePath);
    }
}