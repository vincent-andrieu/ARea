import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { serverConfig } from "../config/serverConfig";
import { UserSchema } from "../schemas/user.schema"
import bcrypt from "bcryptjs"

class AuthController {

    private static _userSchema = new UserSchema();

    static login = async (req: Request, res: Response) => {
        try {
          const { username, password } = req.body;
      
          if (!(username && password)) {
            res.status(400).send("All input is required");
          }
          const user = await this._userSchema.findOne({ username });
      
          if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id, username },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );
            // save user token
            user.token = token;
            
            res.status(200).json(user);
          }
          res.status(400).send("Invalid Credentials");
        } catch (err) {
          console.log(err);
        }
    };

    static register = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!(username && password)) {
                res.status(400).send("All input are required");
            }
            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await this._userSchema.findOne({ username });

            if (oldUser) {
                return res.status(409).send("User Already Exist. Please Login");
            }
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            const user = await this._userSchema.add({
                username: username.toLowerCase(),
                password: encryptedPassword,
            });

            // Create token
            const token = jwt.sign(
                { user_id: user._id, username },
                serverConfig.jwtSecret,
                { expiresIn: "2h" }
            );
            user.token = token;
            return res.status(201).json(user);
        } catch (err) {
            console.log(err);
        }
    };

}
export default AuthController;