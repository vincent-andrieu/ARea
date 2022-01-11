import mongoose from "mongoose";

import Action from "@global/action.class";

const actionSchema = new mongoose.Schema({
    label: { type: String },
    cron: { type: Boolean }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class ActionSchema {
    private _model = mongoose.model("Action", actionSchema);

    public async edit(action: Action): Promise<void> {
        await this._model.findByIdAndUpdate(action._id, action);
    }

    public async getById(id: string): Promise<Action> {
        const result: Action = await this._model.findById(id);

        return new Action(result);
    }
}