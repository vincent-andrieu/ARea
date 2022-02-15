export type ObjectId = string;

export default abstract class Model {
    _id?: ObjectId;

    constructor(model: Model) {
        this._id = model._id?.toString();
    }
}

export function getObjectId(model: ObjectId | Model): ObjectId {
    return (model as Model)._id || model as ObjectId;
}
export function getStrObjectId(model: string | ObjectId | Model): string {
    return (model as Model)._id?.toString() || (model as ObjectId).toString();
}