export interface DateTimeResult {
    time: number; // timestamp
}

export interface TimeResult {
    time: string; // cron Result string ex: "* * * * *"
}

export interface TwitchStreamResult {
    Username: string;
    StreamTitle: string;
    StreamGame: string;
    StreamLanguage: string;
    StreamThumbnailUrl: string;
    StreamViewers: number;

}

export interface TwitterTweetResult {
    username: string;
    lastTweetId: string; // target user
    text: string;
    lang: string;
    coordinates: [number, number];
    created_at: string;
    like_count: number;
    quote_count: number;
    reply_count: number;
    retweet_count: number;
}

export interface RSSResult {
    url: string;
    prevHash: string;
}

export interface DiscordMessageResult {
    channelId: string;
    message: string;
}

export interface GithubResult {
    owner: string;
    repository: string;
    url: string;
    id: number;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    username: string;
    userId: number;
    userUrl: string;
    body: string;
    created_at: string;
    labels: string[];
    lastId: number;
}

export interface UnsplashPostResult {
    username: string;
    downloadPath: string;
    name: string;
    lastname: string;
    lastPostId: string;
    created_at: string;
    description: string;
    likes: number;
    link: string;
}

export type ActionResult = DateTimeResult | TimeResult
    | TwitchStreamResult | TwitterTweetResult | RSSResult
    | DiscordMessageResult | GithubResult | UnsplashPostResult;