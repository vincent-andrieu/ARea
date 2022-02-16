import { env } from "process";

const UNSPLASH_CONSUMER_KEY = env.UNSPLASH_API_KEY;
const UNSPLASH_CONSUMER_SECRET = env.UNSPLASH_API_SECRET_KEY;
const UNSPLASH_CALLBACK_URL = env.UNSPLASH_CALLBACK_URL;
const UNSPLASH_CALLBACK_MOBILE = env.UNSPLASH_CALLBACK_MOBILE;

export const unsplashConfig = {
    clientID: UNSPLASH_CONSUMER_KEY,
    clientSecret: UNSPLASH_CONSUMER_SECRET,
    callbackURL: UNSPLASH_CALLBACK_URL,
    passRequestToCallback: true
};

export const unsplasConfigMobile = {
    clientID: UNSPLASH_CONSUMER_KEY,
    clientSecret: UNSPLASH_CONSUMER_SECRET,
    callbackURL: UNSPLASH_CALLBACK_MOBILE
};