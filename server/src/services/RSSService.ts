import { AReaSchema } from "../schemas/area.schema";
import ARea from "../classes/area.class";
import { RSSConfig } from "../models/ActionConfig";
import axios from "axios";
import bcrypt from "bcryptjs";
import { RSSResult } from "@models/ActionResult";

// interface ArticleListenerItem {
//     url: string,
//     areaId: string,
//     hash: string | null
// }

export default class RSSService {

    // static listenerCache: ArticleListenerItem[] = [];
    static areaSchema: AReaSchema = new AReaSchema;

    // static async refreshTargetList() {
    //     const list: ARea[] = await this.areaSchema.fetchByAction(ActionType.RSS_ENTRY);

    //     list.forEach((value: ARea) => {
    //         try {
    //             const inputs = value.trigger.inputs as RSSConfig;

    //             if (value._id && inputs.url != undefined)
    //                 RSSService.listenerCache.push({ url: inputs.url, areaId: value._id.toString(), hash: null });
    //             else
    //                 console.warn("RSSService refreshTargetList: in action, missing parameter url.");
    //         } catch (err) {
    //             console.error(`RSSService refreshTargetList: ${err}.`);
    //         }
    //     });
    // }

    static async evalAction(area: ARea): Promise<boolean> {
        try {
            const config = area.trigger.inputs as RSSConfig;
            const outputs = area.trigger.outputs as RSSResult || {};
            const response = await axios.get(config.url);

            const body: string = response.data;
            const hash: string = body.substring(0, 1024) + body.length.toString();

            if (outputs.prevHash != hash) {
                outputs.prevHash = hash;
                outputs.url = config.url;
                area.trigger.outputs = outputs;
                await this.areaSchema.edit(area);
                return true;
            }
        } catch (err) {
            console.error("RSSService.evalAction: an error occured => ", err);
        }
        return false;
    }
}