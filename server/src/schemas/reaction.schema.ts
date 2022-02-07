import mongoose from "mongoose";

import Reaction, { ReactionType } from "@classes/reaction.class";
import { ASchema } from "./abstract.schema";

const reactionSchema = new mongoose.Schema({
    label: { type: String },
    type: { type: String, enum: ReactionType },
    parameters: [{
        name: { type: String },
        type: { type: String }
    }]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class ReactionSchema extends ASchema<Reaction> {
    constructor() {
        super(Reaction, "Reaction", reactionSchema);
    }

    public async getByType(type: ReactionType) {
        const result = await this._model.find({
            type: type
        });
        if (!result || result.length == 0)
            throw "getByType: action not found";
        return result[0];
    }
}