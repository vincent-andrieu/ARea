import mongoose, { PopulateOptions } from "mongoose";

import Model, { getStrObjectId, ObjectId } from "@classes/model.class";

export abstract class ASchema<T extends Model> {
    protected _model: mongoose.Model<unknown>;

    constructor(protected _ctor: { new(model: T): T }, collectionName: string, schema: mongoose.Schema) {
        try {
            this._model = mongoose.model(collectionName);
        } catch (err) {
            this._model = mongoose.model<unknown>(collectionName, schema);
        }
    }

    public async add(model: T): Promise<T> {
        try {
            const result = await this._model.create(model);

            return new this._ctor(result.toObject<T>());
        } catch (error: any) {
            throw new Error(error.toString());
        }
    }

    public async edit(model: T): Promise<T> {
        try {
            const result = await this._model.findByIdAndUpdate(model._id, model);

            if (!result)
                throw "Fail to edit model: " + model.toString();
            return new this._ctor(model);
        } catch (error: any) {
            throw new Error(error.toString());
        }
    }

    public async get(model: string | ObjectId | Model, populate?: string | string[] | PopulateOptions | PopulateOptions[], select?: string): Promise<T> {
        const id: string = getStrObjectId(model);

        if (!id || id.length === 0)
            throw "undefined id";
        try {
            let query = this._model.findById(id);

            if (populate)
                query = query.populate(populate);
            if (select)
                query.select(select);
            const result = await query;

            if (!result)
                throw "Unknown ID: " + id;
            return new this._ctor(result?.toObject<T>());
        } catch (err) {
            throw new Error(`Failed to get element with id: ${id}`);
        }
    }

    public async find(model: any): Promise<T[]> {
        return await this._model.find(model).exec() as unknown as T[];
    }

    public async delete(model: T): Promise<void> {
        await this._model.deleteOne({ _id: model._id });
    }

    public async deleteById(id: string | ObjectId) {
        return await this._model.deleteOne({ _id: id });
    }
}