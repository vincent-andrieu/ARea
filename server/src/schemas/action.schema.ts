import mongoose from "mongoose";

import Action, { ActionType } from "@classes/action.class";
import { ASchema } from "./abstract.schema";

const actionSchema = new mongoose.Schema({
    label: { type: String },
    cron: { type: Boolean },
    type: { type: String, enum: ActionType }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class ActionSchema extends ASchema<Action> {
    constructor() {
        super(Action, "Action", actionSchema);
    }
}