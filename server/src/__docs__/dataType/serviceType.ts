export const serviceType = {
    ServiceType: {
        type: "string",
        enum: ["CRON", "TWITCH", "UNSPLASH", "TWITTER",
            "RSS", "DISCORD", "GITHUB", "NOTION",
            "DROPBOX"
        ],
        description: "name of the service"
    }
};