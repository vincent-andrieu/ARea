import mongoose from "mongoose";

import Reaction from "@global/reaction.class";

const reactionSchema = new mongoose.Schema({
    label: { type: String }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class ReactionSchema {
    private _model = mongoose.model("Reaction", reactionSchema);

    public async edit(reaction: Reaction): Promise<void> {
        await this._model.findByIdAndUpdate(reaction._id, reaction);
    }

    public async getById(id: string): Promise<Reaction> {
        const result: Reaction = await this._model.findById(id);

        return new Reaction(result);
    }
}