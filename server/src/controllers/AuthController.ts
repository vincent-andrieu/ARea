import { env } from "process";

import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { serverConfig } from "@config/serverConfig";
import { getStrObjectId } from "@classes/model.class";
import { UserSchema } from "@schemas/user.schema";
import { JwtData } from "../middlewares/checkJwt";
import { ServiceType } from "@models/ServiceType";
import User from "@classes/user.class";

export default class AuthController {

    private static _userSchema = new UserSchema();

    public static signToken(data: JwtData): string {
        const token = jwt.sign(
            { data },
            serverConfig.jwtSecret,
            {
                expiresIn: "2h"
            }
        );
        return token;
    }

    public static async login(req: Request, res: Response) {
        try {
            const username: string = req.body.username?.toLowerCase();
            const password: string = req.body.password;

            if (!(username && password))
                return res.status(400).send("All input is required");

            const user: User | undefined = await AuthController._userSchema.findByUsername(username);
            if (!user)
                return res.status(400).json({ "message": "Invalid Credentials" });

            if (user.password && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = AuthController.signToken({
                    user_id: getStrObjectId(user)
                });
                // save user token
                user.token = token;

                return res.status(200).json((await AuthController._userSchema.edit(user)).toRaw());
            } else
                return res.status(400).json({ "message": "Invalid Credentials" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ "message": "an error occured" });
        }
    }

    public static async logout(req: Request, res: Response) {
        req.session = null;
        res.redirect(`${env.CLIENT_HOST}/login`);
    }

    public static async register(req: Request, res: Response) {
        try {
            const username: string = req.body.username?.toLowerCase();
            const password: string = req.body.password;

            if (!(username && password))
                return res.status(400).send("All input are required");
            // check if user already exist
            // Validate if user exist in our database
            const oldUser: User | undefined = await AuthController._userSchema.findByUsername(username);

            if (oldUser)
                return res.status(409).send("User Already Exist. Please Login");
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            const user = await AuthController._userSchema.add(new User({
                username: username,
                password: encryptedPassword
            }));

            // Create token
            const token: string = AuthController.signToken(<JwtData>{
                user_id: getStrObjectId(user),
                username
            });
            user.token = token;

            return res.status(201).json((await AuthController._userSchema.edit(user)).toRaw());
        } catch (err) {
            console.error(err);
            return res.status(500).json({ "message": "an error occured" });
        }
    }

    public static async disconnectService(req: Request, res: Response) {
        const { service } = req.params;
        const userId = req.user?.data.user_id;

        if (!userId)
            return res.status(500).send();
        if (service.toUpperCase() in ServiceType)
            try {
                const user = await AuthController._userSchema.get(userId);

                if (user.oauth)
                    delete user.oauth[service.toLowerCase()];
                await AuthController._userSchema.edit(user);
                res.sendStatus(204);
            } catch (error: unknown) {
                console.log("disconnectService: ", (error as Error).toString());
                res.status(500).send((error as Error).toString());
            }
        else
            res.status(404).send();
    }
}