import { PopulateOptions } from "mongoose";
import { Request, Response } from "express";

import { AReaSchema } from "../schemas/area.schema";
import ARea from "../classes/area.class";
import Action, { ActionType } from "../classes/action.class";
import { getStrObjectId, ObjectId } from "@classes/model.class";
import { ActionSchema } from "@schemas/action.schema";
import { ReactionSchema } from "@schemas/reaction.schema";
import { UserSchema } from "@schemas/user.schema";
import { ActionConfig } from "model/ActionConfig";
import { ReactionConfig } from "model/ReactionConfig";
import { ActionSelector, ReactionSelector } from "model/AreaSelector";
import TimeService from "../services/TimeService";

export default class AreaController {

    private static _areaSchema = new AReaSchema();
    private static _actionSchema = new ActionSchema();
    private static _reactionSchema = new ReactionSchema();
    private static _userSchema = new UserSchema();

    private static async _buildAreaBody(action: string | ActionSelector, reaction: string | ReactionSelector,
        actionInput: ActionConfig, reactionInput: ReactionConfig) {
        let actionInDb;
        let reactionInDb;

        if ((action as ActionSelector)?.type != undefined && (reaction as ReactionSelector)?.type != undefined) {
            actionInDb = await AreaController._actionSchema.getByType((action as ActionSelector).type);
            reactionInDb = await AreaController._reactionSchema.getByType((reaction as ReactionSelector).type);
        } else {
            actionInDb = await AreaController._actionSchema.get(action as string);
            reactionInDb = await AreaController._reactionSchema.get(reaction as string);
        }
        return {
            trigger: {
                action: actionInDb,
                inputs: actionInput
            },
            consequence: {
                reaction: reactionInDb,
                inputs: reactionInput
            }
        };
    }

    public static async create(req: Request, res: Response) {
        try {
            const action: string | ActionSelector | undefined = req.body.trigger.action;
            const actionInput: ActionConfig | undefined = req.body.trigger.inputs;
            const reaction: string | ReactionSelector | undefined = req.body.consequence.reaction;
            const reactionInput: ReactionConfig | undefined = req.body.consequence.inputs;
            const userId = req.user?.data.user_id;

            if (!userId || userId.length === 0)
                throw "Unknow user id";
            if (actionInput == undefined || reactionInput == undefined || action == undefined || reaction == undefined)
                return res.status(400).send("Invalid body");
            try {
                const areaBody = await AreaController._buildAreaBody(action, reaction, actionInput, reactionInput);
                const area: ARea = await AreaController._areaSchema.add(areaBody);
                if (!area._id)
                    throw "Undefined area id";
                AreaController._userSchema.addARea(userId, area._id);

                if (areaBody.trigger.action.type == ActionType.CRON)
                    TimeService.registerCron(area); // start cron job
                res.status(201).json({ _id: area._id, ...areaBody });
            } catch (e: any) {
                console.error("AreaController::create ", e);
                res.status(400).send("Invalid body: action reaction");
            }
        } catch (error: any) {
            console.log("[AreaController] create :", error.toString());
            res.status(400).send(error.toString());
        }
    }

    public static async readOne(req: Request, res: Response) {
        const id = req.params.id;
        const userId = req.user?.data.user_id;

        try {
            if (!userId || userId.length === 0 || !req.user?.data.user_id)
                throw "Unknow user id";
            const user = await AreaController._userSchema.get(req.user?.data.user_id, {
                path: "areas",
                populate: "trigger.action consequence.reaction" as unknown as PopulateOptions
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

    public static async readList(req: Request, res: Response) {
        const userId = req.user?.data.user_id;

        try {
            if (!userId || userId.length === 0 || !req.user?.data.user_id)
                throw "Unknow user id";
            const user = await AreaController._userSchema.getAreaList(req.user?.data.user_id);
            res.status(200).json(user.areas);
        } catch (error: any) {
            res.status(404).send(error.toString());
        }
    }

    static update = async (req: Request, res: Response) => {
        const userId = req.user?.data.user_id;
        const areaId = req.params.id;
        const action: string | ActionSelector | undefined = req.body.trigger.action;
        const actionInput: ActionConfig | undefined = req.body.trigger.inputs;
        const reaction: string | ReactionSelector | undefined = req.body.consequence.reaction;
        const reactionInput: ReactionConfig | undefined = req.body.consequence.inputs;

        try {
            if (!userId || userId.length === 0)
                throw "Unknow user id";
            if (actionInput == undefined || reactionInput == undefined || action == undefined || reaction == undefined)
                return res.status(400).send("Invalid body");

            const user = await AreaController._userSchema.getAreaList(userId);
            const area = (user.areas as Array<ARea>).find((element: ARea) => getStrObjectId(element) === getStrObjectId(areaId));
            if (!area)
                return res.status(404).send(`Failed to find area with id: ${areaId}`);
            if ((area.trigger.action as Action)?.type == ActionType.CRON)
                TimeService.unregisterCron(area._id as ObjectId); // stop cron job
            const areaBody = await AreaController._buildAreaBody(action, reaction, actionInput, reactionInput);
            const areaUpdate = await AreaController._areaSchema.edit({
                _id: area._id,
                ...areaBody
            });
            if ((areaUpdate.trigger.action as Action)?.type == ActionType.CRON
                && (area.trigger.action as Action)?.type != ActionType.CRON)
                TimeService.registerCron(area); // start cron job
            res.status(200).json({
                _id: areaUpdate._id,
                ...areaBody
            });
        } catch (error: any) {
            res.status(500).send(error.toString());
        }
    };

    static delete = async (req: Request, res: Response) => {
        const areaId = req.params.id;
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
            if ((area.trigger.action as Action)?.type == ActionType.CRON)
                TimeService.unregisterCron(area._id as ObjectId); // stop cron job
            await AreaController._areaSchema.deleteById(areaId);
            await AreaController._userSchema.removeARea(userId, areaId);

            return res.status(200).send(`Successfully deleted area ${areaId}`);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    };
}