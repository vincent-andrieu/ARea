import mongoose from "mongoose";

import ARea from "@global/area.class";

const areaSchema = new mongoose.Schema({
    action: { type: mongoose.Schema.Types.ObjectId, ref: "Action" },
    reactions: { type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class AReaSchema {
    private _model = mongoose.model("ARea", areaSchema);

    public async edit(area: ARea): Promise<void> {
        await this._model.findByIdAndUpdate(area._id, area);
    }

    public async getById(id: string): Promise<ARea> {
        const result: ARea = await this._model.findById(id);

        return new ARea(result);
    }
}