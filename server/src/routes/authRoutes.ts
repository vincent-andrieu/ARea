import express from "express";
import passport from "passport";
import "../passport/setupPassport";
import AuthController from "../controllers/AuthController"
import authMiddleware from "../middlewares/checkJwt"

const router = express.Router();

router.post("/login", AuthController.login)

router.post("/register", AuthController.register)

// ----

router.get("/github", authMiddleware, passport.authenticate("github", {
    scope: ["user:email"]
}));

router.get("/github/redirect", authMiddleware, passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

router.get("/twitter", passport.authenticate("twitter"));

router.get("/twitter/redirect", 
    passport.authenticate("twitter", {failureRedirect: "/login"}),
    function(req, res) {
        res.redirect("/");
    }
);

router.get("/twitch", passport.authenticate("twitch"));

router.get("/twitch/redirect",
    passport.authenticate("twitch", {failureRedirect: "/login"}),
    function(req, res) {
        res.redirect("/");
    }
);

export default router;