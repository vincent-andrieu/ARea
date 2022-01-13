import mongoose from "mongoose";

import Reaction from "@global/reaction.class";
import { ASchema } from "./abstract.schema";

const reactionSchema = new mongoose.Schema({
    label: { type: String }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class ReactionSchema extends ASchema<Reaction> {
    constructor() {
        super(Reaction, "Reaction", reactionSchema);
    }
}