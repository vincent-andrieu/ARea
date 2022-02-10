import { ActionSchema } from "@schemas/action.schema";
import { ReactionSchema } from "@schemas/reaction.schema";
import { Request, Response } from "express";
import { ServiceType } from "../models/ServiceType";
import Action from "../classes/action.class";
import Reaction from "../classes/reaction.class";

interface ServiceListItem {
    label: ServiceType,
    haveAction: boolean,
    haveReaction: boolean
}

export default class ServiceController {
    private static _actionSchema = new ActionSchema();
    private static _reactionSchema = new ReactionSchema();

    static getServiceList = async (req: Request, res: Response) => {
        const userId = req.user?.data.user_id;

        try {
            if (!userId || userId.length === 0 || !req.user?.data.user_id)
                throw "Unknow user id";

            const actions: Action[] = await this._actionSchema.find({});
            const reactions: Reaction[] = await this._reactionSchema.find({});
            const serviceList: ServiceListItem[] = [];

            actions.forEach((item) => {
                const service = serviceList.find(el => el.label == item.service);
                if (service == undefined)
                    serviceList.push({ label: item.service, haveAction: true, haveReaction: false });
                else
                    service.haveAction = true;
            });
            reactions.forEach((item) => {
                const service = serviceList.find(el => el.label == item.service);
                if (service == undefined)
                    serviceList.push({ label: item.service, haveAction: false, haveReaction: true });
                else
                    service.haveReaction = true;
            });
            res.status(200).send(serviceList);
        } catch (err: any) {
            res.status(500).send(err.toString());
        }
    };

    static getActionList = async (req: Request, res: Response) => {
        const userId = req.user?.data.user_id;
        const filterService: string = req.params.service;

        try {
            if (!userId || userId.length === 0 || !req.user?.data.user_id)
                throw "Unknow user id";
            let actions: Action[] = await this._actionSchema.find({});

            if (filterService != undefined)
                actions = actions.filter(el => el.service.toUpperCase() === filterService.toUpperCase());

            res.status(200).send(actions);
        } catch (err: any) {
            res.status(500).send(err.toString());
        }
    };

    static getReactionList = async (req: Request, res: Response) => {
        const userId = req.user?.data.user_id;
        const filterService: string = req.params.service;

        try {
            if (!userId || userId.length === 0 || !req.user?.data.user_id)
                throw "Unknow user id";

            let reactions: Reaction[] = await this._reactionSchema.find({});

            if (filterService != undefined)
                reactions = reactions.filter(el => el.service.toUpperCase() === filterService.toUpperCase());

            res.status(200).send(reactions);
        } catch (err: any) {
            res.status(500).send(err.toString());
        }
    };
}