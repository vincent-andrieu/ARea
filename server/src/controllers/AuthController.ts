import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { serverConfig } from "../config/serverConfig";
import { UserSchema } from "../schemas/user.schema";
import bcrypt from "bcryptjs";

class AuthController {

    private static _userSchema = new UserSchema();

    public static signToken(data: any): string {
        const token = jwt.sign(
            { data },
            serverConfig.jwtSecret,
            {
                expiresIn: "2h"
            }
        );
        return token;
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!(username && password))
                return res.status(400).send("All input is required");

            const user = await this._userSchema.findByUsername(username);

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = this.signToken({ user_id: user._id, username });
                // save user token
                user.token = token;
                await this._userSchema.edit(user);

                res.status(200).json(user);
            } else
                res.status(400).json({ "message": "Invalid Credentials" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ "message": "an error occured" });
        }
    };

    static register = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!(username && password))
                return res.status(400).send("All input are required");
            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await this._userSchema.findByUsername(username);

            if (oldUser)
                return res.status(409).send("User Already Exist. Please Login");
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            const user = await this._userSchema.add({
                username: username.toLowerCase(),
                password: encryptedPassword
            });

            // Create token
            const token = this.signToken({ user_id: user._id, username });
            user.token = token;
            await this._userSchema.edit(user);

            return res.status(201).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json({ "message": "an error occured" });
        }
    };

}
export default AuthController;