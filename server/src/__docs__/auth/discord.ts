export const discordRedirect = {
    get: {
        tags: ["Auth"],
        description: "Redirect to discord page to add the bot to a server.",
        responses: {
            500: {
                description: "Invalid discord callback"
            }
        }
    }
};