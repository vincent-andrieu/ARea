import mongoose from "mongoose";

import ARea from "@classes/area.class";
import { ASchema } from "./abstract.schema";
import Action, { ActionType } from "@classes/action.class";
import { ActionSchema } from "./action.schema";
import { lang } from "moment";

const areaSchema = new mongoose.Schema({
    action: { type: mongoose.Schema.Types.ObjectId, ref: "Action" },
    reaction: { type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class AReaSchema extends ASchema<ARea> {
    static actionSchema: ActionSchema = new ActionSchema;

    constructor() {
        super(ARea, "ARea", areaSchema);
    }

    public async getListByUsername(username: string) {
        return await this._model.find({ username });
    }

    public async fetchByAction(type: ActionType) {
        const list = await AReaSchema.actionSchema.find({ type });
        const idList = list.map((action: Action) => action._id);

        return await this._model.find(
            { action: { $in: idList } }).populate("action reaction") as unknown as ARea[];
    }
}