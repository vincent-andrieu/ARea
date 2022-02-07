import mongoose from "mongoose";

import Action, { ActionType } from "@classes/action.class";
import { ASchema } from "./abstract.schema";

const actionSchema = new mongoose.Schema({
    type: { type: String, enum: ActionType },
    parameters: [{
        name: { type: String },
        type: { type: String }
    }]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class ActionSchema extends ASchema<Action> {
    constructor() {
        super(Action, "Action", actionSchema);
    }

    public async getByType(type: ActionType) {
        const result = await this._model.find({
            type: type
        });
        if (!result || result.length == 0)
            throw "getByType: action not found";
        return result[0];
    }
}