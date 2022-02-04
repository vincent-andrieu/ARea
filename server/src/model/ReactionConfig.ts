export interface TwitterPostTweetConfig {
    message: string;
}

export interface LinkedinPostConfig {
    message: string;
}

export interface TwitterUpdatePictureConfig {
    filepath: string;
}

export interface DiscordPostMsgConfig {
    message: string;
    channelId: string;
}

export interface GithubCreateIssueConfig {
    owner: string;
    repository: string;
    title: string;
    body: string;
}

export interface NotionAddMessageConfig {
    message: string;
    urlPage: string;
}

export interface DropboxUploadConfig {
    filename: string | null;
}

export type ReactionConfig = TwitterPostTweetConfig | LinkedinPostConfig
    | TwitterChangePPConfig | DiscordPostMsgConfig | GithubCreateIssueConfig
    | NotionAddMessageConfig | DropboxUploadConfig;