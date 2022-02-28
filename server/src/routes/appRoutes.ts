import express, { Request, Response } from "express";
import moment from "moment";
import swaggerUi from "swagger-ui-express";
import docs from "../__docs__";
import { servicesList } from "@config/serverConfig";

import authMiddleware from "../middlewares/checkJwt";
import { UserSchema } from "@schemas/user.schema";

const router = express.Router();

router.get("/about.json", (req, res) => {
    const aboutJson = {
        client: {
            host: req.headers.host || req.ip
        },
        server: {
            current_time: moment().unix(),
            ...servicesList
        }
    };
    res.json(aboutJson);
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    if (!req.user?.data.user_id)
        return res.sendStatus(404);

    try {
        await new UserSchema().get(req.user?.data.user_id);
        res.sendStatus(204);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));

export default router;