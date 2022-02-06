export const reactionConfig = {
    TwitterPostConfig: {
        type: "object",
        required: ["message"],
        properties: {
            message: {
                type: "string",
                description: "Text content of the tweet"
            }
        }
    },
    LinkedinPostConfig: {
        type: "object",
        required: ["message"],
        properties: {
            message: {
                type: "string",
                description: "Text content of the linkeding post"
            }
        }
    },
    TwitterChangePPConfig: {
        type: "object",
        required: ["url"],
        properties: {
            url: {
                type: "string",
                description: "The link of the image url (jpg)"
            }
        }
    },
    DiscordPostMsgConfig: {
        type: "object",
        required: ["message"],
        properties: {
            message: {
                type: "string",
                description: "Text content of the discord message"
            }
        }
    },
    GithubCreateIssueConfig: {
        type: "object",
        required: ["owner", "repository", "title", "body"],
        properties: {
            owner: {
                type: "string",
                description: "Username of the repository's owner"
            },
            repository: {
                type: "string",
                description: "Name of the github repository"
            },
            title: {
                type: "string",
                description: "Title of the github issue"
            },
            body: {
                type: "string",
                description: "Message content of the github issue"
            }
        }
    },
    NotionAddMessageConfig: {
        type: "object",
        required: ["message", "urlPage"],
        properties: {
            message: {
                type: "string",
                description: "The content of the notion message"
            },
            urlPage: {
                type: "string",
                description: "The url of the page where the message is append"
            }
        }
    },
    OnedriveUploadTextConfig: {
        type: "object",
        required: ["content", "filename"],
        properties: {
            content: {
                type: "string",
                description: "The content of the file created on dropbox"
            },
            filename: {
                type: "string",
                description: "Name of the file on dropbox"
            }
        }
    }
};