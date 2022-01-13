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

export default router;