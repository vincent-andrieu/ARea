import { env } from "process";
import { StrategyOption } from "passport-linkedin-oauth2";

import { Utils } from "@services/utils";

const LINKEDIN_CLIENT_ID = env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_CALLBACK_URL = env.LINKEDIN_CALLBACK_URL;

export const linkedinConfig: StrategyOption = {
    clientID: LINKEDIN_CLIENT_ID || "",
    clientSecret: LINKEDIN_CLIENT_SECRET || "",
    callbackURL: (Number(env.SERVER_PROXY) ? Utils.getServerProxyHost() : Utils.getServerHost()) + LINKEDIN_CALLBACK_URL || ""
};