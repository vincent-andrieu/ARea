import { env } from "process";
import express from "express";
import passport from "passport";
import "../passport/setupPassport";
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middlewares/checkJwt";

const router = express.Router();

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

// ----

router.get("/github", authMiddleware, passport.authenticate("github", {
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

export default router;