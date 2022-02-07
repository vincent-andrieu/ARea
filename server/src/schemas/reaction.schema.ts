import mongoose from "mongoose";

import Reaction, { ReactionType } from "@classes/reaction.class";
import { ASchema } from "./abstract.schema";

const reactionSchema = new mongoose.Schema({
    type: { type: String, enum: ReactionType, required: true },
    parameters: [{
        name: { type: String, required: true },
        type: { type: String, required: true }
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