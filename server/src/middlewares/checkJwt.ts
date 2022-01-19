import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { serverConfig } from "@config/serverConfig";

export default (req: Request, res: Response, next: NextFunction) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"]?.substring(7);

    if (!token)
        return res.status(403).send("A token is required for authentication");
    try {
        const decoded = jwt.verify(token, serverConfig.jwtSecret);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};