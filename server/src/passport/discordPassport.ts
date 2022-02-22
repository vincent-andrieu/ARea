import passport from "passport";

import { Request } from "express";

import { Profile, VerifyCallback, Scope, Strategy as DiscordStrategy } from "@oauth-everything/passport-discord";
import { discordConfig } from "@config/discordConfig";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import { getStrObjectId } from "@classes/model.class";
import OAuthProvider from "../models/oAuthProvider.enum";
import { decodeJwt } from "../middlewares/checkJwt";
import AuthController from "../controllers/AuthController";

const successfullyAuthentificated = async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    const userSchema = new UserSchema();

    try {
        if (!req.user && typeof req.query.state === "string")
            req.user = decodeJwt(req.query.state as string);

        const userId: string | undefined = req.user?.data.user_id;

        if (userId) {
            const user: User = await userSchema.get(userId);

            if (!user.oauth)
                user.oauth = {};
            user.oauth.discord = {
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            const userEdited = await userSchema.edit(user);
            if (done)
                return done(null, userEdited);
            return userEdited;
        }

        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.DISCORD, profile.username || "");

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: profile.username || getStrObjectId(oldUser)
            });
            // save user token
            oldUser.token = token;
            if (!oldUser.oauth)
                oldUser.oauth = {};
            oldUser.oauth.discord = {
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            await userSchema.edit(oldUser);
            done(null, oldUser);
        } else {
            console.log("Create new user");

            const user = await userSchema.add(new User({
                username: profile.displayName || "",
                oauthLoginProvider: OAuthProvider.DISCORD,
                oauthLoginProviderId: profile.username,
                oauth: {
                    discord: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }));
            const token = AuthController.signToken({
                user_id: getStrObjectId(user),
                username: profile.username || getStrObjectId(user)
            });
            user.token = token;
            await userSchema.edit(user);
            done(null, user);
        }
    } catch (error: any) {
        done(error, undefined);
    }
};

const discordStrategy = new DiscordStrategy({
    clientID: discordConfig.clientID || "",
    clientSecret: discordConfig.clientSecret || "",
    callbackURL: discordConfig.callbackURL || "",
    scope: [Scope.IDENTIFY, Scope.EMAIL, Scope.GUILDS_JOIN],
    passReqToCallback: true
}, successfullyAuthentificated
);

passport.use("discord-web", discordStrategy);