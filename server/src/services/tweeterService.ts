import { env } from "process";

import TwitterApi from "twitter-api-v2";

// doc :
// https://www.npmjs.com/package/twitter-v2
// https://github.com/plhery/node-twitter-api-v2#readme

// https://api.twitter.com/2/users/:id/tweets

export async function GetUserLastTweet(username: string): Promise<void> {

    if (!env.TWITTER_BEARER_TOKEN)
        return;
    const client = new TwitterApi(env.TWITTER_BEARER_TOKEN);
    const user = await client.v2.userByUsername(username);
    console.log(user);

    const userTimeline = await client.v2.userTimeline(user.data.id, {
        expansions: ["attachments.media_keys", "attachments.poll_ids", "referenced_tweets.id"],
        "media.fields": ["url"]
    });
    for await (const tweet of userTimeline) {
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
}

export async function TweetATweet(text: string): Promise<void> {
    if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY)
        return;
    const client = new TwitterApi({
        appKey: env.TWITTER_API_KEY,
        appSecret: env.TWITTER_API_SECRET_KEY,
        accessToken: "", // TODO replace with DB call
        accessSecret: "" // TODO replace with DB call
    });

    client.v2.tweet(text);
}

export async function UpdateProfileBanner(imagePath: string): Promise<void> {
    if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY)
        return;
    const client = new TwitterApi({
        appKey: env.TWITTER_API_KEY,
        appSecret: env.TWITTER_API_SECRET_KEY,
        accessToken: "", // TODO replace with DB call
        accessSecret: "" // TODO replace with DB call
    });

    client.v1.updateAccountProfileBanner(imagePath);
}

export async function UpdateProfileImage(imagePath: string): Promise<void> {
    if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY)
        return;
    const client = new TwitterApi({
        appKey: env.TWITTER_API_KEY,
        appSecret: env.TWITTER_API_SECRET_KEY,
        accessToken: "", // TODO replace with DB call
        accessSecret: "" // TODO replace with DB call
    });

    client.v1.updateAccountProfileImage(imagePath);
}