export interface TwitterPostTweetConfig {
    message: string;
}

export interface LinkedinPostConfig {
    message: string;
}

export interface TwitterUpdatePictureConfig {
    nothing: string;
}

export interface DiscordPostMsgConfig {
    message: string;
    channelId: string;
}

export interface GithubCreateIssueConfig {
    owner: string;
    repository: string;
    title: string;
    body?: string;
    assignees?: string[];
}

export interface GithubCreatePullRequestConfig {
    owner: string;
    repository: string;
    title?: string;
    body?: string;
    currentBranch: string;
    pullingBranch: string;
    maintainer_can_modify?: boolean;
}

export interface NotionAddMessageConfig {
    message: string;
    urlPage: string;
}

export interface DropboxUploadConfig {
    localFilepath: string | null;
    remoteFilepath: string | null;
}

export type ReactionConfig = LinkedinPostConfig | TwitterPostTweetConfig
    | TwitterUpdatePictureConfig | DiscordPostMsgConfig | GithubCreateIssueConfig | GithubCreatePullRequestConfig
    | NotionAddMessageConfig | DropboxUploadConfig;