import { ActionSchema } from "../schemas/action.schema";
import { ReactionSchema } from "../schemas/reaction.schema";
import mongoose from "mongoose";
import Database from "../init/database";
import Action from "../classes/action.class";

import actionDataset from "../../../db/actions.json";
import reactionDataset from "../../../db/reactions.json";
import Reaction from "../classes/reaction.class";

export default class DBDataset {
    private static _actionSchema = new ActionSchema();
    private static _reactionSchema = new ReactionSchema();

    public static async load() {
        await Database.connect();
        await mongoose.connection.dropCollection("users");
        await mongoose.connection.dropCollection("areas");

        actionDataset.forEach((item) => {
            this._actionSchema.add(item as Action);
        });
        reactionDataset.forEach((item) => {
            this._reactionSchema.add(item as Reaction);
        });
    }
}