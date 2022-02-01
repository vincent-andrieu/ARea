import { env } from "process";

const DROPBOX_CONSUMER_KEY = env.DROPBOX_API_KEY;
const DROPBOX_CONSUMER_SECRET = env.DROPBOX_API_SECRET_KEY;
const DROPBOX_CALLBACK_URL = env.DROPBOX_CALLBACK_URL;

export const dropboxConfig = {
    clientID: DROPBOX_CONSUMER_KEY || "",
    clientSecret: DROPBOX_CONSUMER_SECRET || "",
    callbackURL: DROPBOX_CALLBACK_URL || ""
};