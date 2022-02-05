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
    tweet: string;
}

export interface RSSResult {
    url: string;
    prevHash: string;
}

export interface DiscordMessageResult {
    channelId: string;
    message: string;
}

export interface GithubIssueResult {
    owner: string;
    repository: string;
}

export interface GithubPullReqResult {
    owner: string;
    repository: string;
}

export interface UnsplashPostResult {
    username: string;
    downloadPath: string;
}

export type ActionResult = DateTimeResult | TimeResult
    | TwitchStreamResult | TwitterTweetResult | RSSResult
    | DiscordMessageResult | GithubIssueResult | GithubPullReqResult | UnsplashPostResult;