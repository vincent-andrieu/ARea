import { env } from "process";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import "../passport/setupPassport";
import authMiddleware from "../middlewares/checkJwt";
import AuthController from "../controllers/AuthController";
import { TwitchMobileStrategy } from "../passport/twitchPassport";
import { TwitterMobileStrategy } from "../passport/twitterPassport";
import { UnsplashMobileStrategy } from "../passport/unsplashPassport";
import { discordBotConfig } from "@config/discordConfig";

const router = express.Router();

router.post("/login", AuthController.login);

router.get("/logout", AuthController.logout);

router.post("/register", AuthController.register);

router.post("/disconnect/:service", authMiddleware, AuthController.disconnectService);

router.get("/github", (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate("github-web", {
        scope: ["user:email", "repo"],
        state: req.query.token as string | undefined
    })(req, res, next)
);

router.get("/github/redirect", passport.authenticate("github-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/twitter", (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate("twitter-web", {
        state: req.query.token as string | undefined
    })(req, res, next)
);

router.get("/twitter/mobile", passport.authenticate("twitter-mobile"));

router.get("/twitter/redirect", passport.authenticate("twitter-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.post("/twitter/redirect/mobile", TwitterMobileStrategy);

router.get("/twitch", (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate("twitch-web", {
        state: req.query.token as string | undefined
    })(req, res, next)
);

router.get("/twitch/mobile", passport.authenticate("twitch-mobile"));

router.get("/twitch/redirect", passport.authenticate("twitch-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.post("/twitch/redirect/mobile", TwitchMobileStrategy);

router.get("/notion", (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate("notion", {
        state: req.query.token as string | undefined
    })(req, res, next)
);

router.get("/notion/redirect", passport.authenticate("notion", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/linkedin", (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate("linkedin", {
        state: req.query.token as string | undefined
    })(req, res, next)
);

router.get("/linkedin/redirect", passport.authenticate("linkedin", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/dropbox", (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate("dropbox-oauth2-web", {
        state: req.query.token as string | undefined
    })(req, res, next)
);

router.get("/dropbox/redirect", passport.authenticate("dropbox-oauth2-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.get("/discord", (_: Request, res: Response) => {
    if (!env.DISCORD_CLIENT_ID || !env.DISCORD_CALLBACK_PERMISSION)
        return res.status(500).send("Invalid discord callback");

    res.redirect(discordBotConfig.redirectUrl);
});

router.get("/unsplash", (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate("unsplash-web", {
        state: req.query.token as string | undefined
    })(req, res, next)
);

router.get("/unsplash/mobile", passport.authenticate("unsplash-mobile"));

router.get("/unsplash/redirect", passport.authenticate("unsplash-web", {
    successRedirect: "/auth/redirect",
    failureRedirect: `${env.CLIENT_HOST}/login/failure`
}));

router.post("/unsplash/redirect/mobile", UnsplashMobileStrategy);

router.get("/redirect", (request: Request, response: Response) => {
    if (request.user?.data.token)
        response.redirect(`${env.CLIENT_HOST}/areas?token=${request.user.data.token}`);
    else
        response.redirect(`${env.CLIENT_HOST}/areas`);
});

export default router;