import mongoose from "mongoose";

import User from "@classes/user.class";
import { ObjectId } from "@classes/model.class";
import { ASchema } from "./abstract.schema";

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

export class UserSchema extends ASchema<User> {
    constructor() {
        super(User, "User", userSchema);
    }

    public async isLoginValid(username: string, password: string): Promise<boolean> {
        const result: User = await this._model.findOne({ username, password }) as unknown as User;

        return !!result;
    }
}