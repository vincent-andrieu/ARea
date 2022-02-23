import mongoose, { PopulateOptions } from "mongoose";

import ARea from "@classes/area.class";
import { ASchema } from "./abstract.schema";
import Action, { ActionType } from "@classes/action.class";
import { ActionSchema } from "./action.schema";

const areaSchema = new mongoose.Schema({
    trigger: {
        action: { type: mongoose.Schema.Types.ObjectId, ref: "Action", required: true },
        inputs: { type: mongoose.Schema.Types.Mixed, required: true },
        outputs: { type: mongoose.Schema.Types.Mixed }
    },
    consequence: {
        inputs: { type: mongoose.Schema.Types.Mixed, required: true },
        reaction: { type: mongoose.Schema.Types.ObjectId, ref: "Reaction", required: true }
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class AReaSchema extends ASchema<ARea> {
    static actionSchema: ActionSchema = new ActionSchema;

    constructor() {
        super(ARea, "ARea", areaSchema);
    }

    public async fetchByAction(type: ActionType) {
        const result = await this.getAreaList();

        return result.filter(area => {
            return (area.trigger.action as Action)?.type == type;
        });
    }

    public async getAreaList(): Promise<ARea[]> {
        const result = this.find(undefined, [
            {
                path: "trigger",
                populate: "action" as unknown as PopulateOptions
            },
            {
                path: "consequence",
                populate: "reaction" as unknown as PopulateOptions
            }
        ]);
        return result;
    }

}