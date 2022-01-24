import { Request, Response } from "express";
import { AReaSchema } from "../schemas/area.schema";
import ARea from "../classes/area.class";
import { ObjectId } from "../classes/model.class";
import Action from "@classes/action.class";
import Reaction from "@classes/reaction.class";
import { ActionSchema } from "@schemas/action.schema";
import { ReactionSchema } from "@schemas/reaction.schema";
import { UserSchema } from "@schemas/user.schema";

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
            const user = await this._userSchema.getById(userId);

            user.areas?.push(area);
            this._userSchema.edit(user);
            res.status(201).json({_id: area._id, action: actionInDb, reaction: reactionInDb});
        } catch (error: any) {
            console.log("[AreaController] create : ", error.toString());
            res.sendStatus(400);
        }
    };

    static readOne = (req: Request, res: Response) => {
        const id = new ObjectId(String(req.params.id));

        this._areaSchema.getById(id)
            .then((object: ARea) => {
                res.status(200).json(object);
            }, () => {
                res.status(404);
            })
            .catch(() => {
                res.status(500);
            });
    };

    static readList = (req: Request, res: Response) => {
        const username = String(req.params.username);

        this._areaSchema.getListByUsername(username)
            .then((list) => {
                res.status(200).json(list);
            }, () => {
                res.status(400);
            })
            .catch(() => {
                res.status(500);
            });
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