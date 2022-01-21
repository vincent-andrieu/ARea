import { env } from "process";

const LINKEDIN_CLIENT_ID = env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_CALLBACK_URL = env.LINKEDIN_CALLBACK_URL;

export const linkedinConfig = {
    clientID: LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL: LINKEDIN_CALLBACK_URL
};