import mongoose from "mongoose";

import Reaction, { ReactionType } from "@classes/reaction.class";
import { ASchema } from "./abstract.schema";

const reactionSchema = new mongoose.Schema({
    label: { type: String },
    type: { type: String, enum: ReactionType },
    parameters: { type: mongoose.Schema.Types.Mixed }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class ReactionSchema extends ASchema<Reaction> {
    constructor() {
        super(Reaction, "Reaction", reactionSchema);
    }
}