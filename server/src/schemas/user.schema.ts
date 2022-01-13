import mongoose from "mongoose";

import User from "@global/user.class";
import { ObjectId } from "@global/model.class";
import { ASchema } from "./abstract.schema";

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    token: { type: String, unique: true },
    areas: [
        { type: mongoose.Schema.Types.ObjectId, ref: "ARea" }
    ]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

export class UserSchema extends ASchema<User> {
    constructor() {
        super(User, "User", userSchema);
    }

    public async isLoginValid(username: string, password: string): Promise<boolean> {
        const result: User = await this._model.findOne({ username, password }) as unknown as User;

        return !!result;
    }
}