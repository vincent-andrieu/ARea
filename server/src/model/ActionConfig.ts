export interface DateTimeConfg {
    time: number; // timestamp
}

export interface TimeConfig {
    time: string; // cron config string ex: "* * * * *"
}

export interface TwitchStreamConfig {
    username: string; // target user
}

export interface TwitterTweetConfig {
    username: string; // target user
    lastTweetId: string; // target user
}

export interface RSSConfig {
    url: string;
    prevHash: string;
}

export interface DiscordMessageConfig {
    channelId: string;
}

export interface GithubIssueConfig {
    owner: string;
    repository: string;
}

export interface GithubPullReqConfig {
    owner: string;
    repository: string;
}

export interface UnsplashPostConfig {
    username: string;
    name: string;
    lastname: string;
    downloadPath: string;
    lastPostId: string;
    created_at: string;
    description: string;
    likes: number;
}

export type ActionConfig = DateTimeConfg | TimeConfig
    | TwitchStreamConfig | TwitterTweetConfig | RSSConfig
    | DiscordMessageConfig | GithubIssueConfig | GithubPullReqConfig | UnsplashPostConfig;