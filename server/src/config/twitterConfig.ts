import { env } from "process";

import { Utils } from "@services/utils";

const TWITTER_CONSUMER_KEY = env.TWITTER_API_KEY;
const TWITTER_CONSUMER_SECRET = env.TWITTER_API_SECRET_KEY;
const TWITTER_CALLBACK_URL = env.TWITTER_CALLBACK_URL;

export const twitterConfig = {
    consumerKey: TWITTER_CONSUMER_KEY || "",
    consumerSecret: TWITTER_CONSUMER_SECRET || "",
    callbackURL: (Number(env.SERVER_PROXY) ? Utils.getServerProxyHost() : Utils.getServerHost()) + TWITTER_CALLBACK_URL || ""
};