import mongoose from "mongoose";

export type ObjectId = mongoose.Schema.Types.ObjectId;
export const ObjectId = mongoose.Schema.Types.ObjectId;

export default abstract class Model {
    _id?: ObjectId;

    constructor(model: Model) {
        this._id = typeof model._id === "string" ? new ObjectId(model._id) : model._id;

        delete (model as any).__v;
    }
}