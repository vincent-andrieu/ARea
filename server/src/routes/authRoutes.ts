import { env } from "process";
import express, { Request, Response } from "express";
import passport from "passport";
import "../passport/setupPassport";
import authMiddleware from "../middlewares/checkJwt";
import AuthController from "../controllers/AuthController";
import { TwitchMobileStrategy } from "../passport/twitchPassport";
import { TwitterMobileStrategy } from "../passport/twitterPassport";
import { UnsplashMobileStrategy } from "../passport/unsplashPassport";

const router = express.Router();

router.post("/login", AuthController.login);

router.get("/logout", AuthController.logout);

router.post("/register", AuthController.register);

router.post("/disconnect/:service", authMiddleware, AuthController.disconnectService);

router.get("/github", passport.authenticate("github-web", {
    scope: ["user:email"]
}));
    scope: ["user:email"]
}));

router.get("/github/redirect", passport.authenticate("github-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/twitter", passport.authenticate("twitter-web"));

router.get("/twitter/mobile", passport.authenticate("twitter-mobile"));

router.get("/twitter/redirect", passport.authenticate("twitter-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.post("/twitter/redirect/mobile", TwitterMobileStrategy);

router.get("/twitch", passport.authenticate("twitch-web"));

router.get("/twitch/mobile", passport.authenticate("twitch-mobile"));

router.get("/twitch/redirect", passport.authenticate("twitch-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.post("/twitch/redirect/mobile", TwitchMobileStrategy);

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

router.get("/dropbox", passport.authenticate("dropbox-oauth2-web"));

router.get("/dropbox/redirect", passport.authenticate("dropbox-oauth2-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/discord", passport.authenticate("discord-web"));

router.get("/discord/redirect", passport.authenticate("discord-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/unsplash", passport.authenticate("unsplash-web"));

router.get("/unsplash/mobile", passport.authenticate("unsplash-mobile"));

router.get("/unsplash/redirect", passport.authenticate("unsplash-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.post("/unsplash/redirect/mobile", UnsplashMobileStrategy);

router.get("/redirect", (request: Request, response: Response) => {
    response.redirect(`${env.CLIENT_HOST}/areas?token=${request.user?.data.token}`);
});

export default router;