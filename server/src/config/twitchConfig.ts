import { env } from "process";

const TWITCH_CLIENT_ID = env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = env.TWITCH_CLIENT_SECRET;
const TWITCH_CALLBACK_URL = env.TWITCH_CALLBACK_URL;
const TWITCH_CALLBACK_MOBILE = env.TWITCH_CALLBACK_MOBILE;

export const twitchConfig = {
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_CLIENT_SECRET,
    callbackURL: TWITCH_CALLBACK_URL
};

export const twitchMobileConfig = {
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_CLIENT_SECRET,
    callbackURL: TWITCH_CALLBACK_MOBILE
};