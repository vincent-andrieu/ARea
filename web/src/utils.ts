import Model, { ObjectId } from "@classes/model.class";

export function isObjectId(model: Model | ObjectId): model is ObjectId {
    return !(model as Model)._id;
}