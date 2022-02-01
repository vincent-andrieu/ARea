import { StrategyOptions } from "passport-github2";
import { env } from "process";

const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = env.GITHUB_CALLBACK_URL;

export const githubConfig: StrategyOptions = {
    clientID: GITHUB_CLIENT_ID || "",
    clientSecret: GITHUB_CLIENT_SECRET || "",
    callbackURL: GITHUB_CALLBACK_URL || ""
};