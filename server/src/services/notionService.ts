import ARea from "@classes/area.class";
import User from "@classes/user.class";

import { NotionAddMessageConfig } from "@models/ReactionConfig";

import { Client } from "@notionhq/client";
import { makeConsoleLogger } from "@notionhq/client/build/src/logging";

const notionBlockIdRexexp = /([a-z0-9]+)$/;

export default class NotionService {

    public static getBlockIdFromPageUrl(pageUrl: string): string | null {
        const resultRegexp = notionBlockIdRexexp.exec(pageUrl);
        if (!resultRegexp || !resultRegexp[0])
            return null;

        return resultRegexp[0];
    }

    public static async appendBlockToPage(area: ARea, user: User) {

        try {
            const config = area.consequence.inputs as NotionAddMessageConfig;

            if (!user || !user.oauth || !user.oauth || !user.oauth.notion || !user.oauth.notion.accessToken)
                return;
            if (!config)
                return;
            const blockId: string | null = NotionService.getBlockIdFromPageUrl(config.urlPage);
            if (!blockId)
                return;
            const notion = new Client({ auth: user.oauth.notion.accessToken });
            /* const response =  */await notion.blocks.children.append({
                block_id: blockId,
                children: [{ paragraph: { text: [{ text: { content: config.message } }] } }]
            });

        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }
}