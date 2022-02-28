import { env } from "process";

import { Utils } from "@services/utils";

export const twitchConfig = {
    clientID: env.TWITCH_CLIENT_ID,
    clientSecret: env.TWITCH_CLIENT_SECRET,
    callbackURL: (Number(env.SERVER_PROXY) ? Utils.getServerProxyHost() : Utils.getServerHost()) + env.TWITCH_CALLBACK_URL
};