export const user = {
    User: {
        type: "object",
        required: ["username"],
        properties: {
            username: {
                type: "string",
                description: "The username of the account",
                example: "bob"
            },
            token: {
                type: "string",
                description: "JWT token of the user for API Authorization",
                example: "xxx.yyy.zzz"
            },
            areas: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/id"
                }
            },
            oauth: {
                type: "object",
                required: ["twitter", "github", "discord",
                    "dropbox", "notion", "twitch", "linkedin", "unsplash"
                ],
                properties: {
                    twitter: {
                        type: "boolean",
                        description: "Is the user's twitter account connected",
                        example: true
                    },
                    github: {
                        type: "boolean",
                        description: "Is the user's github account connected",
                        example: true
                    },
                    discord: {
                        type: "boolean",
                        description: "Is the user's discord account connected",
                        example: true
                    },
                    dropbox: {
                        type: "boolean",
                        description: "Is the user's dropbox account connected",
                        example: true
                    },
                    notion: {
                        type: "boolean",
                        description: "Is the user's notion account connected",
                        example: true
                    },
                    twitch: {
                        type: "boolean",
                        description: "Is the user's twitch account connected",
                        example: true
                    },
                    linkedin: {
                        type: "boolean",
                        description: "Is the user's linkedin account connected",
                        example: true
                    },
                    unsplash: {
                        type: "boolean",
                        description: "Is the user's unsplash account connected",
                        example: true
                    }
                }
            }
        }
    }
};