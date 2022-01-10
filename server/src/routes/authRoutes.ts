import * as express from "express";
import * as passport from "passport";
import "../passport/setupPassport";

const router = express.Router();

router.get("/github", passport.authenticate("github", {
    scope: ["user:email"]
}));

router.get("/github/redirect", passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

export default router;