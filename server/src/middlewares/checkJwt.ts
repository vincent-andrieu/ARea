import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { serverConfig } from "@config/serverConfig";

export function decodeJwt(token: string): Express.User {
    if (!token || token.length === 0)
        throw "Undefined JWT token";
    const decoded = jwt.verify(token, serverConfig.jwtSecret);

    if (typeof decoded === "string" || !decoded.data)
        throw "Fail to decode access token";
    return decoded as Express.User;
}

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"]?.substring(7);

        if (!token || token.length === 0)
            return res.status(403).send("A token is required for authentication");

        try {
            const decoded = decodeJwt(token);

            req.user = decoded as Express.User;
            req.user.data.token = token;
        } catch (error) {
            return res.status(500).send(error);
        }
    } catch (err) {
        return res.status(401).json({ "message": "Invalid Token" });
    }
    return next();
};

export interface JwtData {
    user_id: string;
    username: string;
    token?: string;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface User extends JwtPayload {
            data: JwtData;
        }
    }
}