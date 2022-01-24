import mongoose from "mongoose";

import ARea from "@classes/area.class";
import { ASchema } from "./abstract.schema";

const areaSchema = new mongoose.Schema({
    action: { type: mongoose.Schema.Types.ObjectId, ref: "Action" },
    reactions: { type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class AReaSchema extends ASchema<ARea> {
    constructor() {
        super(ARea, "ARea", areaSchema);
    }
}