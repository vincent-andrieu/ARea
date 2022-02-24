import { env } from "process";

import { Utils } from "@services/utils";

const NOTION_CLIENT_ID = env.NOTION_CLIENT_ID;
const NOTION_CLIENT_SECRET = env.NOTION_CLIENT_SECRET;
const NOTION_CALLBACK_URL = env.NOTION_CALLBACK_URL;

export const notionConfig = {
    clientId: NOTION_CLIENT_ID,
    clientSecret: NOTION_CLIENT_SECRET,
    callbackURL: (Number(env.SERVER_PROXY) ? Utils.getServerProxyHost() : Utils.getServerHost()) + NOTION_CALLBACK_URL
};