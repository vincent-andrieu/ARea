export const areaTwitchTwitter = {
    TwitterTwitch: {
        summary: "An example of an area with twitch and twitter",
        value: {
            trigger: {
                inputs: {
                    username: "aypierre"
                },
                action: {
                    type: "TWITCH_STREAM",
                    cron: true,
                    parameters: [
                        {
                            name: "username",
                            type: "TEXT"
                        }
                    ]
                }
            },
            consequence: {
                inputs: {
                    message: "New live on twitch"
                },
                reaction: {
                    type: "TWITTER_MSG",
                    parameters: {
                        name: "message",
                        type: "TEXT"
                    }
                }
            }
        }
    }
};