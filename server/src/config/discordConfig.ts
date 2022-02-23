import { env } from "process";

export const discordBotConfig = {
    discord_bot_token: env.DISCORD_BOT_TOKEN,
    redirectUrl: `https://discord.com/oauth2/authorize?client_id=${env.DISCORD_CLIENT_ID}&permissions=${env.DISCORD_CALLBACK_PERMISSION}&scope=bot`
};