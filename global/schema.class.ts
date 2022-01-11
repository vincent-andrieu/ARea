import mongoose from "mongoose";

export type ObjectId = mongoose.Schema.Types.ObjectId;
export const ObjectId = mongoose.Schema.Types.ObjectId;

export default abstract class Schema {
    _id?: ObjectId;

    constructor(schema: Schema) {
        this._id = typeof schema._id === 'string' ? new ObjectId(schema._id) : schema._id;
    }
}