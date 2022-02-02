import { env } from "process";

import TwitterApi from "twitter-api-v2";
import User from "@classes/user.class";

// doc :
// https://www.npmjs.com/package/twitter-v2
// https://github.com/plhery/node-twitter-api-v2#readme

// https://api.twitter.com/2/users/:id/tweets

export async function GetUserLastTweet(username: string, user: User): Promise<boolean> {

    if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY || !user.oauth.twitter)
        throw "Invalid twitter credentials";
    const client = new TwitterApi({
        appKey: env.TWITTER_API_KEY,
        appSecret: env.TWITTER_API_SECRET_KEY,
        accessToken: user.oauth.twitter?.accessToken,
        accessSecret: user.oauth.twitter?.secretToken
    });
    const userTweeting = await client.v2.userByUsername(username);
    console.log(userTweeting);

    const userTimeline = await client.v2.userTimeline(userTweeting.data.id, {
        expansions: ["attachments.media_keys", "attachments.poll_ids", "referenced_tweets.id"],
        "media.fields": ["url"]
    });
    const tweet = userTimeline[0];
    if (tweet.referenced_tweets && tweet.referenced_tweets["type"] != "tweeted")
        return false;
    return true;
    /* for await (const tweet of userTimeline) {
        const medias = userTimeline.includes.medias(tweet);
        const poll = userTimeline.includes.poll(tweet);
        if (tweet.referenced_tweets && tweet.referenced_tweets["type"] != "tweeted")
            continue;
        console.log("tweet : ");
        console.log(tweet);

        if (medias.length)
            console.log("This tweet contains medias! URLs:", medias.map(m => m.url));

        if (poll)
            console.log("This tweet contains a poll! Options:", poll.options.map(opt => opt.label));
        break;
    }
    return false;*/
}

export async function TweetATweet(text: string, user: User): Promise<void> {
    if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY || !user.oauth.twitter)
        throw "Invalid twitter credentials";
    const client = new TwitterApi({
        appKey: env.TWITTER_API_KEY,
        appSecret: env.TWITTER_API_SECRET_KEY,
        accessToken: user.oauth.twitter?.accessToken,
        accessSecret: user.oauth.twitter?.secretToken
    });

    client.v2.tweet(text);
}

export async function UpdateProfileBanner(imagePath: string, user: User): Promise<void> {
    if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY || !user.oauth.twitter)
        throw "Invalid twitter credentials";
    const client = new TwitterApi({
        appKey: env.TWITTER_API_KEY,
        appSecret: env.TWITTER_API_SECRET_KEY,
        accessToken: user.oauth.twitter?.accessToken,
        accessSecret: user.oauth.twitter?.secretToken
    });

    client.v1.updateAccountProfileBanner(imagePath);
}

export async function UpdateProfileImage(imagePath: string, user: User): Promise<void> {
    if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY)
        throw "Invalid twitter credentials";
    const client = new TwitterApi({
        appKey: env.TWITTER_API_KEY,
        appSecret: env.TWITTER_API_SECRET_KEY,
        accessToken: user.oauth.twitter?.accessToken,
        accessSecret: user.oauth.twitter?.secretToken
    });

    client.v1.updateAccountProfileImage(imagePath);
}