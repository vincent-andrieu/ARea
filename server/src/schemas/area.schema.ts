import mongoose from "mongoose";

import ARea from "@classes/area.class";
import { ASchema } from "./abstract.schema";
import { ObjectId } from "@classes/model.class";

const areaSchema = new mongoose.Schema({
    action: { type: mongoose.Schema.Types.ObjectId, ref: "Action" },
    reaction: { type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class AReaSchema extends ASchema<ARea> {
    constructor() {
        super(ARea, "ARea", areaSchema);
    }

    public async getListByUsername(username: string) {
        return await this._model.find({ username });
    }

    public async removeById(id: ObjectId) {
        return await this._model.findById(id).remove().exec();
    }
}