export const reactionType = {
    ReactionType: {
        type: "string",
        enum: ["TWITTER_MSG", "LINKEDIN_MSG", "TWITTER_PP",
            "DISCORD_MSG", "GITHUB_ISSUE", "NOTION_MSG",
            "DROPBOX_UPLOAD"
        ]
    }
};