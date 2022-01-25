import jwt from "jsonwebtoken";
import { serverConfig } from "../config/serverConfig";

const verifyToken = (req, res, next) => {

    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"] || 
            (req.headers["authorization"] ? req.headers["authorization"].substr(7) : undefined) || req.user.token;

        if (!token)
            return res.status(403).send("A token is required for authentication");

        const decoded = jwt.verify(token, serverConfig.jwtSecret);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ "message": "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;

export default verifyToken;