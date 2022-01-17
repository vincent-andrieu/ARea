import mongoose from "mongoose";

import Model, { ObjectId } from "@global/model.class";

export abstract class ASchema<T extends Model> {
    protected _model: mongoose.Model<unknown>;

    constructor(protected _ctor: { new(model: T): T }, collectionName: string, schema: mongoose.Schema) {
        this._model = mongoose.model<unknown>(collectionName, schema);
    }

    public async add(model: T): Promise<T> {
        const result: T = await this._model.create(model) as unknown as T;

        return new this._ctor(result);
    }

    public async edit(model: T): Promise<void> {
        await this._model.findByIdAndUpdate(model._id, model);
    }

    public async getById(id: ObjectId): Promise<T> {
        if (!id)
            throw "undefined id";
        const result: T = await this._model.findById(id) as unknown as T;

        return new this._ctor(result);
    }

    public async delete(model: T): Promise<void> {
        await this._model.deleteOne({ _id: model._id });
    }
}