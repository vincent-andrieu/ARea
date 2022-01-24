import express from "express";
import moment from "moment";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerConfig } from "@config/swaggerConfig";

import authMiddleware from "../middlewares/checkJwt";

const router = express.Router();

router.get("/about.json", (req, res) => {
    const aboutJson = {
        client: {
            host: req.ip
        },
        server: {
            current_time: moment().unix()
        }
    };
    res.json(aboutJson);
});

/**
 * @swagger
 *
 * /:
 *  get:
 *      summary: Api homepage.
 *      responses:
 *          200:
 *              description: Api is working correctly
 */
router.get("/", authMiddleware, (req, res) => {
    res.status(204).send();
});

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerConfig)));

export default router;