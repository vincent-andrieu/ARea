import { env } from "process";
import express, { Request, Response } from "express";
import passport from "passport";
import "../passport/setupPassport";
import AuthController from "../controllers/AuthController";

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

router.get("/github/redirect", passport.authenticate("github", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/twitter", passport.authenticate("twitter"));

router.get("/twitter/redirect", passport.authenticate("twitter", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/twitch", passport.authenticate("twitch"));

router.get("/twitch/redirect", passport.authenticate("twitch", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/notion", passport.authenticate("notion"));

router.get("/notion/redirect", passport.authenticate("notion", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/linkedin", passport.authenticate("linkedin"));

router.get("/linkedin/redirect", passport.authenticate("linkedin", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/dropbox", passport.authenticate("dropbox-oauth2"));

router.get("/dropbox/redirect", passport.authenticate("dropbox-oauth2", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/discord", passport.authenticate("discord"));

router.get("/discord/redirect", passport.authenticate("discord", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));


router.get("/unsplash", passport.authenticate("unsplash"));

router.get("/unsplash/redirect", passport.authenticate("unsplash", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/redirect", (request: Request, response: Response) => {
    response.redirect(`${env.CLIENT_HOST}/areas?token=${request.user?.data.token}`);
});

export default router;