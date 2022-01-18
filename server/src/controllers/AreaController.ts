import { Request, Response } from "express";
import { AReaSchema } from "../schemas/area.schema";
import ARea from "../classes/area.class";
import { ObjectId } from "../classes/model.class";

export default class AreaController {

    private static _areaSchema = new AReaSchema();

    static create = (req: Request, res: Response) => {
        const data: ARea = req.body;

        console.log("data ", data);

        this._areaSchema.add(data)
            .then((value: ARea) => {
                res.status(201).json(value);
            })
            .catch((reason) => {
                res.status(400);
            });
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