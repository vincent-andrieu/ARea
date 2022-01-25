import express from "express";
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
    successRedirect: "/",
    failureRedirect: "/login"
}));

router.get("/twitter", passport.authenticate("twitter"));

router.get("/twitter/redirect",
    passport.authenticate("twitter", { failureRedirect: "/login" }),
    function (req, res) {
        res.redirect("/");
    }
);

router.get("/twitch", passport.authenticate("twitch"));

router.get("/twitch/redirect",
    passport.authenticate("twitch", { failureRedirect: "/login" }),
    function (req, res) {
        res.redirect("/");
    }
);

router.get("/notion", passport.authenticate("notion"));

router.get("/notion/redirect", passport.authenticate("notion", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

router.get("/linkedin", passport.authenticate("linkedin"));

router.get("/linkedin/redirect", passport.authenticate("linkedin", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

export default router;