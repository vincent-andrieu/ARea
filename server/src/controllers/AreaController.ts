import { Request, Response } from "express";
import { AReaSchema } from "../schemas/area.schema";
import ARea from "../classes/area.class";
import { getStrObjectId, ObjectId } from "@classes/model.class";
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

    static async create(req, res: Response) {
        const action: Action = req.body.action;
        const reaction: Reaction = req.body.reaction;
        const userId: string = req.user?.user_id;

        //TODO: GESTION D'ERREUR DU BODY
        try {
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

    static async readOne(req, res: Response) {
        const id = req.params.id;

        try {
            const user = await AreaController._userSchema.getById(req.user?.user_id, {
                path: "areas",
                populate: "action reaction" as unknown as PopulateOptions
            });
            const area = (user.areas as any[]).find((element: ARea) => element._id == id);
            if (area)
                return res.json(area);
            else
                return res.status(404).send(`Failed to find area with id: ${id}`);
        } catch (error: any) {
            console.log(error.toString());
            return res.status(404).send(error.toString());
        }
    }

    static async readList(req, res: Response) {
        try {
            const user = await AreaController._userSchema.getById(req.user.data.user_id, {
                path: "areas",
                populate: "action reaction" as unknown as PopulateOptions
            }, "areas");
            res.status(200).json(user.areas);
        } catch (error: any) {
            res.status(404).send(error.toString());
        }
    }

    static async update(req, res: Response) {
        const userId: string = req.user?.user_id;
        const areaId = req.params.id;
        try {
            const action: Action = new Action(req.body.action);
            const reaction: Reaction = new Reaction(req.body.reaction);

            const user = await AreaController._userSchema.getById(userId, "areas");
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

    static async delete(req, res: Response) {
        const areaId = req.params.id;
        const userId = req.user?.user_id;

        try {
            const user = await AreaController._userSchema.getById(userId, {
                path: "areas",
                populate: "action reaction" as unknown as PopulateOptions
            });
            const area = (user.areas as any[]).find((element: ARea) => element._id == areaId);

            if (!area)
                return res.status(404).send(`Failed to find area with id: ${areaId}`);

            const action: ObjectId = area.action as ObjectId;
            const reaction: ObjectId = area.reaction as ObjectId;

            await AreaController._actionSchema.deleteById(action);
            await AreaController._reactionSchema.deleteById(reaction);
            await AreaController._areaSchema.deleteById(areaId);
            await AreaController._userSchema.removeARea(userId, areaId);

            return res.status(200).send(`Successfully deleted area ${areaId}`);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    }
}