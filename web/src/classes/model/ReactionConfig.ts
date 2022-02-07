export interface TwitterPostTweetConfig {
    message: string;
}

export interface LinkedinPostConfig {
    message: string;
}

export interface TwitterChangePPConfig {
    url: string; // image url (jpg)
}

export interface DiscordPostMsgConfig {
    message: string;
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

export interface DropboxUploadTextConfig {
    content: string;
    filename: string;
}

export type ReactionConfig = TwitterPostTweetConfig | LinkedinPostConfig
    | TwitterChangePPConfig | DiscordPostMsgConfig | GithubCreateIssueConfig
    | NotionAddMessageConfig | DropboxUploadTextConfig;