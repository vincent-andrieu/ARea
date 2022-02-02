import mongoose from "mongoose";

import ARea from "@classes/area.class";
import { ASchema } from "./abstract.schema";
import Action, { ActionType } from "@classes/action.class";
import { ActionSchema } from "./action.schema";

const areaSchema = new mongoose.Schema({
    trigger: {
        action: { type: mongoose.Schema.Types.ObjectId, ref: "Action", required: true },
        inputs: { type: mongoose.Schema.Types.Mixed, required: true }
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
        const list = await AReaSchema.actionSchema.find({ type });
        const idList = list.map((action: Action) => action._id);

        return await this._model.find(
            { action: { $in: idList } }).populate("action reaction") as unknown as ARea[];
    }
}