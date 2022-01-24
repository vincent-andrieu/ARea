import mongoose from "mongoose";

import Model, { ObjectId } from "@classes/model.class";

export abstract class ASchema<T extends Model> {
    protected _model: mongoose.Model<unknown>;

    constructor(protected _ctor: { new(model: T): T }, collectionName: string, schema: mongoose.Schema) {
        this._model = mongoose.model<unknown>(collectionName, schema);
    }

    public async add(model: T): Promise<T> {
        try {
            const result: T = await this._model.create(model) as unknown as T;
            return new this._ctor(result);
        } catch (error: any) {
            console.log(error);
            throw new Error(error.toString());
        }        
    }

    public async edit(model: T): Promise<void> {
        await this._model.findByIdAndUpdate(model._id, model);
    }

    public async getById(id: string): Promise<T> {
        if (!id)
            throw "undefined id";
        try {
            const result: T = await this._model.findById(id) as unknown as T;
            return new this._ctor(result);
        } catch (error: any) {
            throw new Error(`Failed to get element with id: ${id}`);
        }
    }

    public async delete(model: T): Promise<void> {
        await this._model.deleteOne({ _id: model._id });
    }
}