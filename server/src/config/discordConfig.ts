import { env } from "process";

const DISCORD_BOT_TOKEN = env.DISCORD_BOT_TOKEN;

export const discordBotConfig = {
    discord_bot_token: DISCORD_BOT_TOKEN
};

const DISCORD_CLIENT_ID = env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = env.DISCORD_CLIENT_SECRET;
const DISCORD_CALLBACK_URL = env.DISCORD_CALLBACK_URL;

export const discordConfig = {
    clientID: DISCORD_CLIENT_ID,
    clientSecret: DISCORD_CLIENT_SECRET,
    callbackURL: DISCORD_CALLBACK_URL
};