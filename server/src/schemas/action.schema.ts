import mongoose from "mongoose";

import Action, { ActionType } from "@classes/action.class";
import { ASchema } from "./abstract.schema";
import { ServiceType } from "../models/ServiceType";

const actionSchema = new mongoose.Schema({
    type: { type: String, enum: ActionType },
    parameters: [{
        name: { type: String, required: true },
        label: { type: String, required: true },
        type: { type: String, required: true }
    }],
    service: { type: String, enum: ServiceType }
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