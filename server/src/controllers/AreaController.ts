import { Request, Response } from "express";
import { AReaSchema } from "../schemas/area.schema";
import ARea from "../classes/area.class";
import { ObjectId } from "../classes/model.class";
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

    static create = async (req, res: Response) => {
        const action: Action = req.body.action;
        const reaction: Reaction = req.body.reaction;
        const userId: string = req.user?.user_id;
        
        //TODO: GESTION D'ERREUR DU BODY
        try {
            const actionInDb = await this._actionSchema.add(action);
            const reactionInDb = await this._reactionSchema.add(reaction);
            const area = await this._areaSchema.add({action: actionInDb, reaction: reactionInDb});
            
            if (!area._id)
                throw "Undefined area id";
            this._userSchema.addARea(userId, area._id);
            res.status(201).json({_id: area._id, action: actionInDb, reaction: reactionInDb});
        } catch (error: any) {
            console.log("[AreaController] create :", error.toString());
            res.sendStatus(400);
        }
    };

    static readOne = (req: Request, res: Response) => {
        const id = req.params.id;

        this._areaSchema.getById(id)
            .then(async (object: any) => {
                console.log(object);
                try {
                    const action = await this._actionSchema.getById(object.action);
                    const reaction = await this._reactionSchema.getById(object.reaction);
                    res.status(200).json({_id: object._id, action, reaction});
                } catch (error: any) {
                    res.status(500).send(`readOne: ${error.toString()}`);
                }                
            }).catch((error) => {
                res.send(error.toString()).status(500);
            });
    };

    static readList = async (req, res: Response) => {
        try {
            const user = await this._userSchema.getById(req.user?.user_id, { 
                path: "areas",
                populate: "action reaction" as unknown as PopulateOptions
            });
            res.status(200).json(user.areas);
        } catch (error) {
            console.log(error);
        }
    };

    static update = (req: Request, res: Response) => {
        const id = new ObjectId(String(req.params.id));
        const data: ARea = req.body;

        this._areaSchema.edit({ _id: id, ...data })
            .then(() => {
                res.status(200);
            }, () => {
                res.status(404);
            })
            .catch(() => {
                res.status(500);
            });
        res.status(200).json(data);
    };

    static delete = (req: Request, res: Response) => {
        const id = new ObjectId(String(req.params.id));

        this._areaSchema.removeById(id)
            .then(() => {
                res.status(200);
            }, () => {
                res.status(404);
            })
            .catch(() => {
                res.status(500);
            });
    };
}