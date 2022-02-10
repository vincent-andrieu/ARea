export const actionResult = {
    DateTimeResult: {
        type: "object",
        required: ["time"],
        properties: {
            time: {
                type: "number",
                description: "timestamp of the action"
            }
        },
        TimeResult: {
            type: "object",
            required: ["time"],
            properties: {
                time: {
                    type: "string",
                    description: "cron Result string",
                    example: "* * * * *"
                }
            }
        },
        TwitchStreamResult: {
            type: "object",
            required: ["Username", "StreamTitle", "StreamGame", "StreamLanguage", "StreamThumbnailUrl", "StreamViewers"],
            properties: {
                username: {
                    type: "string",
                    description: "Username of the streamer",
                    example: "aypierre"
                },
                Username: {
                    type: "string",
                    description: "The username of the streamer",
                    example: "aypierre"
                },
                StreamTitle: {
                    type: "string",
                    description: "The name of the stream",
                    example: "Live sur Minartisanat"
                },
                StreamGame: {
                    type: "string",
                    description: "Videogame played by the streamer",
                    example: "Fortnite"
                },
                StreamLanguage: {
                    type: "string",
                    description: "Language spoken by the streamer",
                    example: "fr"
                },
                StreamThumbnailUrl: {
                    type: "string",
                    description: "Url to the stream thumbnail",
                    example: "http://picture/to/be/downloaded"
                },
                StreamViewers: {
                    type: "number",
                    description: "Actual number of people watching the stream",
                    example: 6940
                }
            }
        },
        TwitterTweetResult: {
            type: "object",
            required: ["username", "lastTweetId", "text", "lang", "coordinates", "created_at", "like_count", "quote_count", "reply_count", "retweet_count"],
            properties: {
                username: {
                    type: "string",
                    description: "Username on twiter",
                    example: "Phaillyks"
                },
                lastTweetId: {
                    type: "string",
                    description: "Id of the last tweet posted by this user",
                    example: "0123456789" // TODO: precise with real format
                },
                text: {
                    type: "string",
                    description: "Text content of the tweet",
                    example: ""
                },
                lang: {
                    type: "string",
                    description: "Tweet language",
                    example: "fr"
                },
                coordinates: {
                    type: "[number, number]",
                    description: "Geographic coordinates of the device that posted the tweet",
                    example: "" // TODO: precise with real format
                },
                created_at: {
                    type: "string",
                    description: "Timepoint of the tweet publication",
                    example: "" // TODO: precise with real format
                },
                like_count: {
                    type: "number",
                    description: "Number of likes on the tweet",
                    example: 667
                },
                quote_count: {
                    type: "number",
                    description: "Number of quotes on the tweet",
                    example: 117
                },
                reply_count: {
                    type: "number",
                    description: "Number of replies on the tweet",
                    example: 84
                },
                retweet_count: {
                    type: "number",
                    description: "Number of retweets on the tweet",
                    example: 974
                }
            }
        },
        RSSResult: {
            type: "object",
            required: ["url"],
            properties: {
                url: {
                    type: "string",
                    description: "url of the rss flux"
                },
                prevHash: {
                    type: "string",
                    description: "must be empty"
                }
            }
        },
        DiscordMessageResult: {
            type: "object",
            required: ["channelId"],
            properties: {
                channelId: {
                    type: "string",
                    description: "id of the discord channel"
                }
            }
        },
        GithubIssueResult: {
            type: "object",
            // required: ["url"/* html url */, "id", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            properties: {
                owner: {
                    type: "string",
                    description: "username of the repository owner"
                },
                repository: {
                    type: "string",
                    description: "name of the repository"
                }
            }
        },
        GithubPulReqResult: {
            type: "object",
            required: ["owner", "repository", "url", "id", "number", "state", "locked", "title", "username", "userId", "userUrl"/* html url */, "body", "created_at", "labels"],
            properties: {
                owner: {
                    type: "string",
                    description: "Username of the repository owner"
                },
                repository: {
                    type: "string",
                    description: "Name of the repository"
                },
                url: {
                    type: "string",
                    description: "Link to the pull request page",
                    example: ""
                },
                id: {
                    type: "number",
                    description: "Identifier of the PR",
                    example: 68323261
                },
                number: {
                    type: "number",
                    description: "Number of the PR",
                    example: 212
                },
                state: {
                    type: "string",
                    description: "State of the PR",
                    example: "open"
                },
                locked: {
                    type: "boolean",
                    description: "PR is locked or not",
                    example: false
                },
                title: {
                    type: "string",
                    description: "Title of the PR",
                    example: "build(deps): lock file maintenance"
                },
                username: {
                    type: "string",
                    description: "Name of the publisher of the PR",
                    example: "colinwahl"
                },
                userID: {
                    type: "number",
                    description: "Id of the publisher of the PR",
                    example: 8431409
                },
                userUrl: {
                    type: "string",
                    description: "Url of the profile of the publisher of the PR",
                    example: "https://github.com/colinwahl"
                },
                body: {
                    type: "string",
                    description: "Content of the PR",
                    example: "Fixes small typo in README: 'you an' -> 'you can'\n"
                },
                created_at: {
                    type: "string",
                    description: "Timestamp of the creation of the PR",
                    example: "2021-11-02T05:09:47Z"
                },
                labels: {
                    type: "string[]",
                    description: "Labels associated to the PR",
                    example: "['documentation', 'bug']"
                }
            }
        },
        UnsplashPostResult: {
            type: "object",
            required: ["username", "downloadPath", "name", "lastname", "lastPostId", "created_at", "description", "likes"],
            properties: {
                username: {
                    type: "string",
                    description: "Username of the post publisher"
                },
                downloadPath: {
                    type: "string",
                    description: "Filepath where the image file has just been downloaded"
                },
                name: {
                    type: "string",
                    description: "First name of the publisher",
                    example: "john"
                },
                lastname: {
                    type: "string",
                    description: "First name of the publisher",
                    example: "doe"
                },
                lastPostId: {
                    type: "string",
                    description: "Id of the last post by this user",
                    example: "" // TODO: precise with real format
                },
                created_at: {
                    type: "string",
                    description: "Timepoint of the post publication",
                    example: "" // TODO: precise with real format
                },
                description: {
                    type: "string",
                    description: "Description of the post's image",
                    example: "Look at this beautiful corpse"
                },
                likes: {
                    type: "number",
                    description: "Number of likes on the post",
                    example: 197
                }
            }
        }
    }
};