import { NextFunction, Request, Response } from "express";
import User from "@classes/user.class";
import jwt from "jsonwebtoken";

import { serverConfig } from "@config/serverConfig";

export interface AReaRequest extends Request {
    user: User;
}

export default (req: AReaRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"]?.substring(7) || req.user.token;

        if (!token)
            return res.status(403).send("A token is required for authentication");

        const decoded = jwt.verify(token, serverConfig.jwtSecret);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ "message": "Invalid Token" });
    }
    return next();
};