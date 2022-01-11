import mongoose from "mongoose";

import Service from "@global/service.class";

const serviceSchema = new mongoose.Schema({
    label: { type: String },
    actions: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Action" }
    ],
    reactions: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }
    ]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class ServiceSchema {
    private _model = mongoose.model("Service", serviceSchema);

    public async edit(service: Service): Promise<void> {
        await this._model.findByIdAndUpdate(service._id, service);
    }

    public async getById(id: string): Promise<Service> {
        const result: Service = await this._model.findById(id);

        return new Service(result);
    }
}