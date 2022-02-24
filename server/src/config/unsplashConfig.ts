import { env } from "process";

import { Utils } from "@services/utils";

const UNSPLASH_CONSUMER_KEY = env.UNSPLASH_API_KEY;
const UNSPLASH_CONSUMER_SECRET = env.UNSPLASH_API_SECRET_KEY;
const UNSPLASH_CALLBACK_URL = env.UNSPLASH_CALLBACK_URL;

export const unsplashConfig = {
    clientID: UNSPLASH_CONSUMER_KEY,
    clientSecret: UNSPLASH_CONSUMER_SECRET,
    callbackURL: (Number(env.SERVER_PROXY) ? Utils.getServerProxyHost() : Utils.getServerHost()) + UNSPLASH_CALLBACK_URL,
    passRequestToCallback: true
};