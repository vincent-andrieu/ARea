import mongoose from "mongoose";

import Action, { ActionType } from "@classes/action.class";
import Reaction from "@classes/reaction.class";
import { ActionSchema } from "@schemas/action.schema";
import { ReactionSchema } from "@schemas/reaction.schema";
import Database from "../init/database";

import actionDataset from "../dataset/actions.json";
import reactionDataset from "../dataset/reactions.json";

export default class DBDataset {
    private static _actionSchema = new ActionSchema();
    private static _reactionSchema = new ReactionSchema();

    public static async init(clearAll: boolean) {
        await Database.connect();
        if (clearAll) {
            await this._removeCollection("users");
            await this._removeCollection("areas");
        }
        actionDataset.forEach(async (item) => {
            try {
                const result = await this._actionSchema.find({ type: item.type });

                if (result.length === 0)
                    this._actionSchema.add(item as Action);

            } catch (e: any) {
                console.error(e.message);
            }
        });
        reactionDataset.forEach(async (item) => {
            try {
                const result = await this._reactionSchema.find({ type: item.type });

                if (result.length === 0)
                    this._reactionSchema.add(item as Reaction);
            } catch (e: any) {
                console.error(e.message);
            }
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