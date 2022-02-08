import { ActionSchema } from "../schemas/action.schema";
import { ReactionSchema } from "../schemas/reaction.schema";
import mongoose from "mongoose";
import Database from "../init/database";
import Action from "../classes/action.class";
import Reaction from "../classes/reaction.class";

import actionDataset from "../../../db/actions.json";
import reactionDataset from "../../../db/reactions.json";

export default class DBDataset {
    private static _actionSchema = new ActionSchema();
    private static _reactionSchema = new ReactionSchema();

    public static async init(clearAll: boolean) {
        await Database.connect();
        if (clearAll) {
            await this._removeCollection("users");
            await this._removeCollection("areas");
        }
        actionDataset.forEach((item) => {
            this._actionSchema.add(item as Action);
        });
        reactionDataset.forEach((item) => {
            this._reactionSchema.add(item as Reaction);
        });
    }

    private static async _removeCollection(name: string) {
        await mongoose.connection.db.listCollections({ name: name })
            .next(function (err, collinfo) {
                if (collinfo) // The collection exists
                    mongoose.connection.dropCollection(name);
            });
    }
}