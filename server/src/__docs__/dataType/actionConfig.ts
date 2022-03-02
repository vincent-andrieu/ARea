export const actionConfig = {
    DateTimeConfig: {
        type: "object",
        required: ["time"],
        properties: {
            time: {
                type: "number",
                description: "timestamp for the action"
            }
        }
    },
    TimeConfig: {
        type: "object",
        required: ["time"],
        properties: {
            time: {
                type: "string",
                description: "cron schedule expression",
                example: "* * * * *"
            }
        }
    },
    TwitchStreamConfig: {
        type: "object",
        required: ["username"],
        properties: {
            username: {
                type: "string",
                description: "Username of the streamer",
                example: "aypierre"
            }
        }
    },
    TwitterTweetConfig: {
        type: "object",
        required: ["username"],
        properties: {
            username: {
                type: "string",
                description: "Username on twiter",
                example: "Phaillyks"
            }
        }
    },
    RSSConfig: {
        type: "object",
        required: ["url"],
        properties: {
            url: {
                type: "string",
                description: "url of the rss flux"
            }
        }
    },
    DiscordMessageConfig: {
        type: "object",
        required: ["channelId"],
        properties: {
            channelId: {
                type: "string",
                description: "id of the discord channel"
            }
        }
    },
    GithubIssueConfig: {
        type: "object",
        required: ["owner", "repository", "lastId"],
        properties: {
            owner: {
                type: "string",
                description: "Username of the repository owner"
            },
            repository: {
                type: "string",
                description: "Name of the repository"
            },
            lastId: {
                type: "number",
                description: "Id of the last fetched issue, can be 0 if no fetch has ever been made",
                example: 723547175
            }
        }
    },
    GithubPulReqConfig: {
        type: "object",
        required: ["owner", "repository", "lastId"],
        properties: {
            owner: {
                type: "string",
                description: "username of the repository owner"
            },
            repository: {
                type: "string",
                description: "name of the repository"
            },
            lastId: {
                type: "number",
                description: "Id of the last fetched pull request, can be 0 if no fetch has ever been made",
                example: 723547175
            }
        }
    },
    UnsplashPostConfig: {
        type: "object",
        required: ["username", "downloadPath"],
        properties: {
            username: {
                type: "string",
                description: "username of the publisher"
            },
            downloadPath: {
                type: "string",
                description: "filepath where the image file has just been downloaded"
            }
        }
    }
};