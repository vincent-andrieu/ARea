import express from "express";
import passport from "passport";
import "../passport/setupPassport";

const router = express.Router();

router.get("/github", passport.authenticate("github", {
    scope: ["user:email"]
}));

router.get("/github/redirect", passport.authenticate("github", {
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