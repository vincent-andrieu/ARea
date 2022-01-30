import { env } from "process";

import TwitterApi from 'twitter-api-v2';

// doc :
// https://www.npmjs.com/package/twitter-v2

// https://api.twitter.com/2/users/:id/tweets

export async function getUserTweet(/* tweeterToken, userID: string */) {

    if (!env.TWITTER_API_KEY || !env.TWITTER_API_SECRET_KEY)
        return;

    // var client = new Twitter({
    // consumer_key: env.TWITTER_API_KEY,
    // consumer_secret: env.TWITTER_API_SECRET_KEY,
    // bearer_token: env.TWITTER_BEARER_TOKEN
    // });
    if (!env.TWITTER_BEARER_TOKEN)
        return;
    var client = new TwitterApi(env.TWITTER_BEARER_TOKEN);
    const user = await client.v2.userByUsername('edobvt');
    console.log(user);


    const userTimeline = await client.v2.userTimeline(user.data.id, {
        expansions: ['attachments.media_keys', 'attachments.poll_ids', 'referenced_tweets.id'],
        'media.fields': ['url'],
    });
    // userTimeline.includes contains a TwitterV2IncludesHelper instance
    for await (const tweet of userTimeline) {
        const medias = userTimeline.includes.medias(tweet);
        const poll = userTimeline.includes.poll(tweet);
        // userTimeline.includes.
        if (tweet.referenced_tweets && tweet.referenced_tweets["type"] != "tweeted")
            continue;
        console.log("new tweet : ");
        console.log(tweet);

        if (medias.length) {
            console.log('This tweet contains medias! URLs:', medias.map(m => m.url));
        }
        if (poll) {
            console.log('This tweet contains a poll! Options:', poll.options.map(opt => opt.label));
        }
        return;
    }
    // console.log(userTimeline);



}//);

//}