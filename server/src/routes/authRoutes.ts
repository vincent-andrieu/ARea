import { env } from "process";
import express from "express";
import passport from "passport";
import "../passport/setupPassport";
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middlewares/checkJwt";

const router = express.Router();

/**
 * @swagger
 * 
 * /auth/login:
 *  post:
 *      summary: Login a user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: The user to login
 *          schema:
 *            type: object
 *            required: 
 *              - username
 *              - password
 *            properties: 
 *              username: 
 *                  type: string
 *              password:
 *                  type: string
 *      responses:
 *         201: 
 *          description: Created   
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * 
 * /auth/register:
 *  post:
 *      summary: Register a new user.
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: The user to register
 *          schema:
 *            type: object
 *            required: 
 *              - username
 *              - password
 *            properties: 
 *              username: 
 *                 type: string
 *              password:
 *                  type: string
 *      responses:
 *         201: 
 *          description: Created   
 */
router.post("/register", AuthController.register);

// ----

router.get("/github", passport.authenticate("github", {
    scope: ["user:email"]
}));

router.get("/github/redirect", authMiddleware, passport.authenticate("github", {
    successRedirect: `${env.CLIENT_HOST}/areas`,
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/twitter", passport.authenticate("twitter"));

router.get("/twitter/redirect",
    passport.authenticate("twitter", { failureRedirect: `${env.CLIENT_HOST}/login/failure` }),
    (_, res) => {
        res.redirect(`${env.CLIENT_HOST}/areas`);
    }
);

router.get("/twitch", passport.authenticate("twitch"));

router.get("/twitch/redirect",
    passport.authenticate("twitch", { failureRedirect: `${env.CLIENT_HOST}/login/failure` }),
    (_, res) => {
        res.redirect(`${env.CLIENT_HOST}/areas`);
    }
);

router.get("/notion", passport.authenticate("notion"));

router.get("/notion/redirect", passport.authenticate("notion", {
    successRedirect: `${env.CLIENT_HOST}/areas`,
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/linkedin", passport.authenticate("linkedin"));

router.get("/linkedin/redirect", passport.authenticate("linkedin", {
    successRedirect: `${env.CLIENT_HOST}/areas`,
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/discord", passport.authenticate("discord"));

router.get("/discord/redirect", passport.authenticate("discord", {
    successRedirect: `${env.CLIENT_HOST}/areas`,
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

export default router;