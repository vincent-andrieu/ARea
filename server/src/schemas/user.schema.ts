import mongoose from "mongoose";

import User from "@global/user.class";
import { ObjectId } from "@global/schema.class";

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    areas: [
        { type: mongoose.Schema.Types.ObjectId, ref: "ARea" }
    ]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class UserSchema {
    private _model = mongoose.model("User", userSchema);

    public async add(user: User): Promise<User> {
        const result: User = await this._model.create(user) as unknown as User;

        return new User(result);
    }

    public async edit(user: User): Promise<void> {
        await this._model.findByIdAndUpdate(user._id, user);
    }

    public async getById(id: ObjectId): Promise<User> {
        if (!id)
            throw "undefined id";
        const result: User = await this._model.findById(id);

        return new User(result);
    }

    public async delete(user: User): Promise<void> {
        await this._model.deleteOne({ _id: user._id });
    }

    public async isLoginValid(username: string, password: string): Promise<boolean> {
        const result: User = await this._model.findOne({ username, password });

        return !!result;
    }
}