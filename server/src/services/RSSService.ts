import { AReaSchema } from "../schemas/area.schema";
import { ActionType } from "../classes/action.class";
import ARea from "../classes/area.class";
import { RSSConfig } from "../model/ActionConfig";
import axios from "axios";
import bcrypt from "bcryptjs";

interface ArticleListenerItem {
    url: string,
    areaId: string,
    hash: string | null
}

export default class RSSService {

    static listenerCache: ArticleListenerItem[] = [];
    static areaSchema: AReaSchema = new AReaSchema;

    static async refreshTargetList() {
        const list: ARea[] = await this.areaSchema.fetchByAction(ActionType.RSS_ENTRY);

        list.forEach((value: ARea) => {
            try {
                const inputs = value.trigger.inputs as RSSConfig;

                if (value._id && inputs.url != undefined)
                    RSSService.listenerCache.push({ url: inputs.url, areaId: value._id.toString(), hash: null });
                else
                    console.warn("RSSService refreshTargetList: in action, missing parameter url.");
            } catch (err) {
                console.error(`RSSService refreshTargetList: ${err}.`);
            }
        });
    }

    static async fetchArticles() {
        this.listenerCache.forEach(async (item) => {
            const response = await axios.get(item.url);
            const body: string = response.data;
            const hash: string = await bcrypt.hash(body, 10);

            if (item.hash != hash) {
                item.hash = hash;
                // TODO TRIGGER REACTION
            }
        });
    }
}