import { Request, Response } from "express";
import { AReaSchema } from "../schemas/area.schema";
import ARea from "../classes/area.class";
import { getObjectId, getStrObjectId, ObjectId } from "@classes/model.class";
import Action from "@classes/action.class";
import Reaction from "@classes/reaction.class";
import { ActionSchema } from "@schemas/action.schema";
import { ReactionSchema } from "@schemas/reaction.schema";
import { UserSchema } from "@schemas/user.schema";
import { PopulateOptions } from "mongoose";

export default class AreaController {

    private static _areaSchema = new AReaSchema();
    private static _actionSchema = new ActionSchema();
    private static _reactionSchema = new ReactionSchema();
    private static _userSchema = new UserSchema();

    static async create(req: Request, res: Response) {
        const action: Action = req.body.action;
        const reaction: Reaction = req.body.reaction;
        const userId = req.user?.data.user_id;

        //TODO: GESTION D'ERREUR DU BODY
        try {
            if (!userId || userId.length === 0)
                throw "Unknow user id";
            const actionInDb = await AreaController._actionSchema.add(action);
            const reactionInDb = await AreaController._reactionSchema.add(reaction);
            const area = await AreaController._areaSchema.add({action: actionInDb, reaction: reactionInDb});

            if (!area._id)
                throw "Undefined area id";
            AreaController._userSchema.addARea(userId, area._id);
            res.status(201).json({_id: area._id, action: actionInDb, reaction: reactionInDb});
        } catch (error: any) {
            console.log("[AreaController] create :", error.toString());
            res.status(400).send(error.toString());
        }
    }

    static async readOne(req: Request, res: Response) {
        const id = req.params.id;
        const userId = req.user?.data.user_id;

        try {
            if (!userId || userId.length === 0)
                throw "Unknow user id";
            const user = await AreaController._userSchema.get(userId, {
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
    }

    static async readList(req: Request, res: Response) {
        const userId = req.user?.data.user_id;

        try {
            if (!userId || userId.length === 0)
                throw "Unknow user id";
            const user = await AreaController._userSchema.get(userId, {
                path: "areas",
                populate: "action reaction" as unknown as PopulateOptions
            }, "areas");
            res.status(200).json(user.areas);
        } catch (error: any) {
            res.status(404).send(error.toString());
        }
    }

    static async update(req: Request, res: Response) {
        const userId = req.user?.data.user_id;
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
            if (getStrObjectId(area?.action) !== getStrObjectId(action))
                return res.status(404).send("Wrong action id");
            if (getStrObjectId(area?.reaction) !== getStrObjectId(reaction))
                return res.status(404).send("Wrong reaction id");
            const actionUpdate = await AreaController._actionSchema.edit(action);
            const reactionUpdate = await AreaController._reactionSchema.edit(reaction);
            res.json({_id: areaId, action: actionUpdate, reaction: reactionUpdate});
        } catch (error: any) {
            res.status(500).send(error.toString());
        }
    }

    static async delete(req: Request, res: Response) {
        const areaId: string = req.params.id;
        const userId = req.user?.data.user_id;

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

            const action: ObjectId = getObjectId(area.action);
            const reaction: ObjectId = getObjectId(area.reaction);

            await Promise.all([
                AreaController._actionSchema.delete(action),
                AreaController._reactionSchema.delete(reaction),
                AreaController._areaSchema.delete(areaId),
                AreaController._userSchema.removeARea(userId, areaId)
            ]);

            return res.status(200).send(`Successfully deleted area ${areaId}`);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    }
}