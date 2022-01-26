import mongoose from "mongoose";

import User from "@classes/user.class";
import { ObjectId } from "@classes/model.class";
import OAuthProvider from "../model/oAuthProvider.enum";
import { ASchema } from "./abstract.schema";
import ARea from "@classes/area.class";

const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    oauthLoginProvider: { type: OAuthProvider },
    oauthLoginProviderId: { type: String },
    token: { type: String },
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

    public async findByUsername(username: string): Promise<User> {
        const result: User = await this._model.findOne({ username }) as unknown as User;

        return result;
    }

    public async addARea(userId: ObjectId | string, area: ARea | ObjectId): Promise<User> {
        const result: User = await this._model.findByIdAndUpdate(userId, { $push: { areas: area } }) as unknown as User;

        return result;
    }

    public async removeARea(userId: ObjectId | string, area: ARea | ObjectId): Promise<User> {
        const result: User = await this._model.findByIdAndUpdate(userId, { $pull: { areas: area } }) as unknown as User;

        return result;
    }

    public async findByOAuthProviderId(providerType: OAuthProvider, providerId: string): Promise<User> {
        const result: User = await this._model.findOne({
            oauthLoginProvider: providerType,
            oauthLoginProviderId: providerId
        }) as unknown as User;

        return result;
    }
}