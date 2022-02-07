export const actionType = {
    ActionType: {
        type: "string",
        enum: ["DATE", "DATETIME", "TWITCH_STREAM",
            "TWITTER_MSG", "RSS_ENTRY", "GITHUB_ISSUE",
            "GITHUB_PULL_REQ", "DISCORD_MSG", "UNSPLASH_POST"
        ]
    }
};