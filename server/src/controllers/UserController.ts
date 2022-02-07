import { Request, Response } from "express";

import { UserSchema } from "@schemas/user.schema";

export default class UserController {

    private static _userSchema = new UserSchema();

    static async getCurrent(req: Request, res: Response) {
        const userId = req.user?.data.user_id;

        try {
            if (!userId || userId.length === 0 || !req.user?.data.user_id)
                throw "Unknow user id";

            const result = await UserController._userSchema.get(userId);

            res.status(200).send(result);
        } catch (error: any) {
            console.log(error.toString());
            return res.status(400).send(error.toString());
        }
    }
}