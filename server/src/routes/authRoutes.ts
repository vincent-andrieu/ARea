import { env } from "process";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

import "../passport/setupPassport";
import authMiddleware from "../middlewares/checkJwt";
import { Utils } from "@services/utils";
import { discordBotConfig } from "@config/discordConfig";
import AuthController from "@controllers/AuthController";

export interface OAuthState {
    token?: string;
    mobile?: boolean;
    referer?: string;
}

const router = express.Router();

router.post("/login", AuthController.login);

router.get("/logout", AuthController.logout);

router.post("/register", AuthController.register);

router.post("/disconnect/:service", authMiddleware, AuthController.disconnectService);

router.get("/twitch", (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.referer)
        req.query.referer = req.headers.referer;
    return passport.authenticate("twitch", {
        state: JSON.stringify(req.query || {})
    })(req, res, next);
});

router.get("/twitch/redirect", (req: Request, res: Response, next: NextFunction) => {
    const state = getStateFromRequest(req);

    if (!state.mobile && !state.referer)
        return res.status(400).send("Undefined referer");
    return passport.authenticate("twitch", {
        successRedirect: Utils.getServerHost() + (state.mobile ? "/auth/redirect/mobile" : ("/auth/redirect/web" + (state.referer ? `?referer=${state.referer}` : ""))),
        failureRedirect: state.mobile ? env.MOBILE_REDIRECT : `${Utils.getClientHost(state.referer as string)}/login/failure`
    })(req, res, next);
});

router.get("/twitter", (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.referer)
        req.query.referer = req.headers.referer;

    if (!req.session)
        req.session = {};
    req.session["state"] = req.query;
    return passport.authenticate("twitter")(req, res, next);
});

router.get("/twitter/redirect", (req: Request, res: Response, next: NextFunction) => {
    const state: OAuthState = req.session?.state || {};

    if (!state.mobile && !state.referer)
        return res.status(400).send("Undefined referer");
    return passport.authenticate("twitter", {
        successRedirect: Utils.getServerHost() + (state.mobile ? "/auth/redirect/mobile" : ("/auth/redirect/web" + (state.referer ? `?referer=${state.referer}` : ""))),
        failureRedirect: state.mobile ? env.MOBILE_REDIRECT : `${Utils.getClientHost(state.referer as string)}/login/failure`
    })(req, res, next);
});

router.get("/unsplash", (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.referer)
        req.query.referer = req.headers.referer;
    return passport.authenticate("unsplash", {
        state: JSON.stringify(req.query || {})
    })(req, res, next);
});

router.get("/unsplash/redirect", (req: Request, res: Response, next: NextFunction) => {
    const state = getStateFromRequest(req);

    if (!state.mobile && !state.referer)
        return res.status(400).send("Undefined referer");
    return passport.authenticate("unsplash", {
        successRedirect: Utils.getServerHost() + (state.mobile ? "/auth/redirect/mobile" : ("/auth/redirect/web" + (state.referer ? `?referer=${state.referer}` : ""))),
        failureRedirect: state.mobile ? env.MOBILE_REDIRECT : `${Utils.getClientHost(state.referer as string)}/login/failure`
    })(req, res, next);
});

router.get("/github", (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.referer)
        req.query.referer = req.headers.referer;
    return passport.authenticate("github", {
        scope: ["user:email", "repo"],
        state: JSON.stringify(req.query || {})
    })(req, res, next);
});

router.get("/github/redirect", (req: Request, res: Response, next: NextFunction) => {
    const state = getStateFromRequest(req);

    if (!state.mobile && !state.referer)
        return res.status(400).send("Undefined referer");
    return passport.authenticate("github", {
        successRedirect: Utils.getServerHost() + (state.mobile ? "/auth/redirect/mobile" : ("/auth/redirect/web" + (state.referer ? `?referer=${state.referer}` : ""))),
        failureRedirect: state.mobile ? env.MOBILE_REDIRECT : `${Utils.getClientHost(state.referer as string)}/login/failure`
    })(req, res, next);
});

router.get("/notion", (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.referer)
        req.query.referer = req.headers.referer;
    return passport.authenticate("notion", {
        state: JSON.stringify(req.query || {})
    })(req, res, next);
});

router.get("/notion/redirect", (req: Request, res: Response, next: NextFunction) => {
    const state = getStateFromRequest(req);

    if (!state.mobile && !state.referer)
        return res.status(400).send("Undefined referer");
    return passport.authenticate("notion", {
        successRedirect: Utils.getServerHost() + (state.mobile ? "/auth/redirect/mobile" : ("/auth/redirect/web" + (state.referer ? `?referer=${state.referer}` : ""))),
        failureRedirect: state.mobile ? env.MOBILE_REDIRECT : `${Utils.getClientHost(state.referer as string)}/login/failure`
    })(req, res, next);
});

router.get("/dropbox", (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.referer)
        req.query.referer = req.headers.referer;
    return passport.authenticate("dropbox", {
        state: JSON.stringify(req.query || {})
    })(req, res, next);
});

router.get("/dropbox/redirect", (req: Request, res: Response, next: NextFunction) => {
    const state = getStateFromRequest(req);

    if (!state.mobile && !state.referer)
        return res.status(400).send("Undefined referer");
    return passport.authenticate("dropbox", {
        successRedirect: Utils.getServerHost() + (state.mobile ? "/auth/redirect/mobile" : ("/auth/redirect/web" + (state.referer ? `?referer=${state.referer}` : ""))),
        failureRedirect: state.mobile ? env.MOBILE_REDIRECT : `${Utils.getClientHost(state.referer as string)}/login/failure`
    })(req, res, next);
});

router.get("/linkedin", (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.referer)
        req.query.referer = req.headers.referer;
    return passport.authenticate("linkedin", {
        state: JSON.stringify(req.query || {})
    })(req, res, next);
});

router.get("/linkedin/redirect", (req: Request, res: Response, next: NextFunction) => {
    const state = getStateFromRequest(req);

    if (!state.mobile && !state.referer)
        return res.status(400).send("Undefined referer");
    return passport.authenticate("linkedin", {
        successRedirect: Utils.getServerHost() + (state.mobile ? "/auth/redirect/mobile" : ("/auth/redirect/web" + (state.referer ? `?referer=${state.referer}` : ""))),
        failureRedirect: state.mobile ? env.MOBILE_REDIRECT : `${Utils.getClientHost(state.referer as string)}/login/failure`
    })(req, res, next);
});

router.get("/discord", (_: Request, res: Response) => {
    if (!env.DISCORD_CLIENT_ID || !env.DISCORD_CALLBACK_PERMISSION)
        return res.status(500).send("Invalid discord callback");

    res.redirect(discordBotConfig.redirectUrl);
});

router.get("/redirect/web", (request: Request, response: Response) => {
    if (request.user?.data.token)
        response.redirect(`${Utils.getClientHost(request.query.referer as string | undefined || request)}/areas?token=${request.user.data.token}`);
    else
        response.redirect(`${Utils.getClientHost(request.query.referer as string | undefined || request)}/areas`);
});
router.get("/redirect/mobile", (request: Request, response: Response) => {
    if (request.user?.data.token)
        response.redirect(`${env.MOBILE_REDIRECT}?token=${request.user.data.token}`);
    else
        response.redirect(`${env.MOBILE_REDIRECT}`);
});

function getStateFromRequest(req: Request): OAuthState {
    return JSON.parse((req.query.state as string | undefined) || "{}");
}

export default router;