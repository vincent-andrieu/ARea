import mongoose, { PopulateOptions } from "mongoose";

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

    public async edit(model: T): Promise<T> {
        try {
            const result: T = await this._model.findByIdAndUpdate(model._id, model) as unknown as T;
            return new this._ctor(result);
        } catch (error: any) {
            throw new Error(error.toString());
        }
    }

    public async getById(id: string, populate?: string | string[] | PopulateOptions | PopulateOptions[], select?: string): Promise<T> {
        if (!id || id.length === 0)
            throw "undefined id";
        try {
            let query = this._model.findById(id);

            if (populate)
                query = query.populate(populate);
            if (select)
                query.select(select);
            const result: T = await query as unknown as T;
            return new this._ctor(result);
        } catch (err) {
            throw new Error(`Failed to get element with id: ${id}`);
        }
    }

    public async delete(model: T): Promise<void> {
        await this._model.deleteOne({ _id: model._id });
    }

    public async deleteById(id: string | ObjectId) {
        return await this._model.deleteOne({ _id: id });
    }
}