import mongoose from "mongoose";

import Action, { ActionType } from "@classes/action.class";
import { ASchema } from "./abstract.schema";

const actionSchema = new mongoose.Schema({
    cron: { type: Boolean, required: true },
    type: { type: String, enum: ActionType, required: true },
    parameters: [{
        name: { type: String, required: true },
        type: { type: String, required: true }
    }]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class ActionSchema extends ASchema<Action> {
    constructor() {
        super(Action, "Action", actionSchema);
    }
}