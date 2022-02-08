import { env } from "process";

const TWITTER_CONSUMER_KEY = env.TWITTER_API_KEY;
const TWITTER_CONSUMER_SECRET = env.TWITTER_API_SECRET_KEY;
const TWITTER_CALLBACK_URL = env.TWITTER_CALLBACK_URL;
const TWITTER_CALLBACK_MOBILE = env.TWITTER_CALLBACK_MOBILE;

export const twitterConfig = {
    consumerKey: TWITTER_CONSUMER_KEY || "",
    consumerSecret: TWITTER_CONSUMER_SECRET || "",
    callbackURL: TWITTER_CALLBACK_URL || ""
};

export const twitterConfigMobile = {
    consumerKey: TWITTER_CONSUMER_KEY || "",
    consumerSecret: TWITTER_CONSUMER_SECRET || "",
    callbackURL: TWITTER_CALLBACK_MOBILE || ""
};