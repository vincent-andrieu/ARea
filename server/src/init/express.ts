import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import cors from "cors";

import { serverConfig } from "@config/serverConfig";
import appRoutes from "../routes/appRoutes";
import serviceRoutes from "../routes/serviceRoutes";
import authRoutes from "../routes/authRoutes";
import userRoutes from "../routes/userRoutes";
import areaRoutes from "../routes/areaRoutes";
import configRoutes from "../routes/configRoutes";
import "../passport/githubPassport";
import "../passport/twitterPassport";
import "../passport/twitchPassport";
import "../passport/notionPassport";
import "../passport/linkedinPassport";
import "../passport/discordPassport";
import "../passport/unsplashPassport";
import "../passport/dropboxPassport";

export const app = express();

export function preinitExpress() {
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

    app.use(cors());
    app.use((_, response, next) => {
        response.setHeader("Access-Control-Allow-Origin", "*");
        next();
    });

    app.use((request, _, next) => {
        console.log(
            "\x1b[36m%s\x1b[0m",
            request.headers.referer,
            "=>", "\x1b[33m" + request.method + "\x1b[0m",
            "\x1b[32m" + request.url + "\x1b[0m"
        );
        next();
    });

    app.use("/", appRoutes);
    app.use("/auth", authRoutes);
    app.use("/user", userRoutes);
    app.use("/service", serviceRoutes);
    app.use("/area", areaRoutes);
    app.use("/config", configRoutes);
}

export default {

    connect(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            preinitExpress();

            app.listen(serverConfig.port, () => {
                console.info(`ARea server is listening on ${serverConfig.port}`);
                resolve();
            }).on("error", (error) => {
                console.error(error.toString());
                reject();
            });
        });
    }
};