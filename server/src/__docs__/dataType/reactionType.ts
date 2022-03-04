export const reactionType = {
    ReactionType: {
        type: "string",
        enum: ["TWITTER_MSG", "TWITTER_PP", "TWITTER_BANNER",
            "DISCORD_MSG", "GITHUB_ISSUE", "GITHUB_PULL_REQ", "NOTION_MSG",
            "DROPBOX_UPLOAD"
        ]
    }
};