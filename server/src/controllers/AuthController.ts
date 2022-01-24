import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { serverConfig } from "@config/serverConfig";
import { UserSchema } from "@schemas/user.schema";

export default class AuthController {

    private static _userSchema = new UserSchema();

    public static async login(req: Request, res: Response) {
        try {
            const username: string = req.body.username;
            const password: string = req.body.password;

            if (!(username && password))
                res.status(400).send("All input is required");

            const user = await AuthController._userSchema.findByUsername(username);

            if (user?.password && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, username },
                    serverConfig.jwtSecret,
                    {
                        expiresIn: "2h"
                    }
                );
                // save user token
                user.token = token;
                await AuthController._userSchema.edit(user);

                res.status(200).json(user);
            } else
                res.status(400).json({ "message": "Invalid Credentials" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ "message": "an error occured" });
        }
    }

    public static async register(req: Request, res: Response) {
        try {
            const username: string = req.body.username;
            const password: string = req.body.password;

            if (!(username && password))
                res.status(400).send("All input are required");
            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await AuthController._userSchema.findByUsername(username);

            if (oldUser)
                return res.status(409).send("User Already Exist. Please Login");
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            const user = await AuthController._userSchema.add({
                username: username.toLowerCase(),
                password: encryptedPassword
            });

            // Create token
            const token = jwt.sign(
                { user_id: user._id, username },
                serverConfig.jwtSecret,
                { expiresIn: "2h" }
            );
            user.token = token;
            await AuthController._userSchema.edit(user);

            return res.status(201).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ "message": "an error occured" });
        }
    }

}