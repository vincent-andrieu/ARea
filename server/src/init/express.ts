import express, { Express } from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import cors from "cors";

import { serverConfig } from "@config/serverConfig";
import appRoutes from "../routes/appRoutes";
import authRoutes from "../routes/authRoutes";
import areaRoutes from "../routes/areaRoutes";
import "../passport/githubPassport";
import "../passport/twitterPassport";
import "../passport/twitchPassport";
import "../passport/notionPassport";
import "../passport/linkedinPassport";
import "../passport/discordPassport";
import "../passport/unsplashPassport";
import "../passport/dropboxPassport";

export const app = express();

export default {

    connect(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
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

            app.use("/", appRoutes);
            app.use("/auth", authRoutes);
            app.use("/area", areaRoutes);

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