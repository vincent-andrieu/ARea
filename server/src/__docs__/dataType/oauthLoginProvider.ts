export const oauthLoginProvider = {
    OauthLoginProvider: {
        type: "number",
        enum: ["LOCAL", "TWITTER", "TWITCH",
            "GITHUB", "NOTION", "LINKEDIN", "DISCORD",
            "UNSPLASH", "DROPBOX"
        ],
        description: "Contain the oauth provider of the user",
        example: 0
    }
};