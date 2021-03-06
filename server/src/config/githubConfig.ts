import { env } from "process";
import { StrategyOptions } from "passport-github2";

import { Utils } from "@services/utils";

const GITHUB_CLIENT_ID = env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = env.GITHUB_CALLBACK_URL;

export const githubConfig: StrategyOptions = {
    clientID: GITHUB_CLIENT_ID || "",
    clientSecret: GITHUB_CLIENT_SECRET || "",
    callbackURL: (Number(env.SERVER_PROXY) ? Utils.getServerProxyHost() : Utils.getServerHost()) + GITHUB_CALLBACK_URL || ""
};