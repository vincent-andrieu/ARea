import mongoose from "mongoose";

export type ObjectId = mongoose.Schema.Types.ObjectId;
export const ObjectId = mongoose.Schema.Types.ObjectId;

export default abstract class Model {
    _id?: ObjectId;

    constructor(model: Model) {
        this._id = typeof model._id === "string" ? new mongoose.Types.ObjectId(model._id) as unknown as ObjectId : model._id;

        delete (model as any).__v;
    }
}

export function getObjectId(model: ObjectId | Model): ObjectId {
    return (model as Model)._id || model as ObjectId;
}
export function getStrObjectId(model: string | ObjectId | Model): string {
    return (model as Model)._id?.toString() || (model as ObjectId).toString();
}