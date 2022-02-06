import { Response } from "express";
import { AReaSchema } from "../schemas/area.schema";
import ARea from "../classes/area.class";
import { getStrObjectId, ObjectId } from "@classes/model.class";
import Action from "@classes/action.class";
import Reaction from "@classes/reaction.class";
import { ActionSchema } from "@schemas/action.schema";
import { ReactionSchema } from "@schemas/reaction.schema";
import { UserSchema } from "@schemas/user.schema";
import { PopulateOptions } from "mongoose";
import { ActionConfig } from "model/ActionConfig";
import { ReactionConfig } from "model/ReactionConfig";

export default class AreaController {

    private static _areaSchema = new AReaSchema();
    private static _actionSchema = new ActionSchema();
    private static _reactionSchema = new ReactionSchema();
    private static _userSchema = new UserSchema();

    static create = async (req, res: Response) => {
        try {
            const action: Action | undefined = req.body.trigger.action;
            const actionInput: ActionConfig | undefined = req.body.trigger.inputs;
            const reaction: Reaction | undefined = req.body.consequence.reaction;
            const reactionInput: ReactionConfig | undefined = req.body.consequence.inputs;
            const userId: string = req.user.data.user_id;

            if (!userId || userId.length === 0)
                throw "Unknow user id";
            if (actionInput == undefined || reactionInput == undefined || action == undefined || reaction == undefined)
                return res.status(400).send("Invalid body");
            //TODO: GESTION D'ERREUR DU BODY
            const actionInDb = await this._actionSchema.add(action);
            const reactionInDb = await this._reactionSchema.add(reaction);
            const area = await this._areaSchema.add({
                trigger: {
                    action: actionInDb,
                    inputs: actionInput
                },
                consequence: {
                    reaction: reactionInDb,
                    inputs: reactionInput
                }
            });

            if (!area._id)
                throw "Undefined area id";
            this._userSchema.addARea(userId, area._id);
            res.status(201).json({ _id: area._id, action: actionInDb, reaction: reactionInDb });
        } catch (error: any) {
            console.log("[AreaController] create :", error.toString());
            res.status(400).send(error.toString());
        }
    };

    static readOne = async (req, res: Response) => {
        const id = req.params.id;
        const userId = req.user?.data.user_id;

        try {
            if (!userId || userId.length === 0)
                throw "Unknow user id";
            const user = await this._userSchema.get(req.user.data.user_id, {
                path: "areas",
                populate: "action reaction" as unknown as PopulateOptions
            });
            const area = (user.areas as Array<ARea>).find((element: ARea) => getStrObjectId(element) == id);
            if (area)
                return res.json(area);
            else
                return res.status(404).send(`Failed to find area with id: ${id}`);
        } catch (error: any) {
            console.log(error.toString());
            return res.status(404).send(error.toString());
        }
    };

    static async readList(req, res: Response) {
        const userId = req.user?.data.user_id;

        try {
            if (!userId || userId.length === 0)
                throw "Unknow user id";
            const user = await this._userSchema.get(req.user.data.user_id, {
                path: "areas",
                populate: "action reaction" as unknown as PopulateOptions
            }, "areas");
            res.status(200).json(user.areas);
        } catch (error: any) {
            res.status(404).send(error.toString());
        }
    }

    static update = async (req, res: Response) => {
        const userId: string = req.user.data.user_id;
        const areaId = req.params.id;

        try {
            if (!userId || userId.length === 0)
                throw "Unknow user id";
            const action: Action = new Action(req.body.action);
            const reaction: Reaction = new Reaction(req.body.reaction);

            const user = await AreaController._userSchema.get(userId, "areas");
            const area = (user.areas as Array<ARea>).find((element: ARea) => getStrObjectId(element) === getStrObjectId(areaId));
            if (!area)
                return res.status(404).send(`Failed to find area with id: ${areaId}`);
            if (getStrObjectId(area?.trigger.action) !== getStrObjectId(action))
                return res.status(404).send("Wrong action id");
            if (getStrObjectId(area?.consequence.reaction) !== getStrObjectId(reaction))
                return res.status(404).send("Wrong reaction id");
            const actionUpdate = await this._actionSchema.edit(action);
            const reactionUpdate = await this._reactionSchema.edit(reaction);
            res.json({ _id: areaId, action: actionUpdate, reaction: reactionUpdate });
        } catch (error: any) {
            res.status(500).send(error.toString());
        }
    };

    static delete = async (req, res: Response) => {
        const areaId = req.params.id;
        const userId = req.user.data.user_id;

        try {
            if (!userId || userId.length === 0)
                throw "Unknow user id";
            const user = await AreaController._userSchema.get(userId, {
                path: "areas",
                populate: "action reaction" as unknown as PopulateOptions
            });
            const area = (user.areas as Array<ARea>)?.find((element) => getStrObjectId(element) === areaId);

            if (!area)
                return res.status(404).send(`Failed to find area with id: ${areaId}`);

            const action: ObjectId = area.trigger.action as ObjectId;
            const reaction: ObjectId = area.consequence.reaction as ObjectId;

            await this._actionSchema.deleteById(action);
            await this._reactionSchema.deleteById(reaction);
            await this._areaSchema.deleteById(areaId);
            await this._userSchema.removeARea(userId, areaId);

            return res.status(200).send(`Successfully deleted area ${areaId}`);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    };
}