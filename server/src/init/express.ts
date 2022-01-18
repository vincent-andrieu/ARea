import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import { serverConfig } from "@config/serverConfig";

import appRoutes from "../routes/appRoutes";
import authRoutes from "../routes/authRoutes";
import areaRoutes from "../routes/areaRoutes";
import "../passport/githubPassport";
import "../passport/twitterPassport";
import "../passport/twitchPassport";

const app = express();

app.use(
    cookieSession({
        name: "session",
        keys: [serverConfig.cookieKey], //TODO: generate true key
        maxAge: 24 * 60 * 60 * 100
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/", appRoutes);
app.use("/auth", authRoutes);
app.use("/", areaRoutes);

app.listen(serverConfig.port, () => {
    console.log(`Area server is listening on ${serverConfig.port}`);
}).on("error", (error) => {
    console.log(error.toString());
});