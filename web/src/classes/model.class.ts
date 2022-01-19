import { Schema } from "mongoose";

export type ObjectId = Schema.Types.ObjectId;
export const ObjectId = Schema.Types.ObjectId;

export default abstract class Model {
    _id?: ObjectId;

    constructor(model: Model) {
        this._id = typeof model._id === 'string' ? new ObjectId(model._id) : model._id;
    }
}