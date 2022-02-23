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

async function successfullyAuthentificated(req: Request, accessToken: string, refreshToken: string, profile: Profile, done?: VerifyCallback<User>): Promise<User | undefined> {
    const userSchema = new UserSchema();

    console.log("Discord:", profile);
    try {
        if (typeof req.query.state === "string")
            req.user = decodeJwt(req.query.state as string);

        const userId: string | undefined = req.user?.data.user_id;
        let providerUser = await userSchema.findByOAuthProviderId(OAuthProvider.DISCORD, profile.id);

        if (userId) {
            if (providerUser && userId !== getStrObjectId(providerUser))
                throw "Service user already connected to another user";
            const user: User = await userSchema.get(userId);

            if (!user.oauth)
                user.oauth = {};
            user.oauth.discord = {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            return userEdited;
        }

        if (!providerUser && (profile._json.email || profile.username || profile._json.username || profile.displayName || profile.id))
            providerUser = await userSchema.findByUsername(profile._json.email || profile.username || profile._json.username || profile.displayName || profile.id);


        if (providerUser) {
            console.log("User already exist");

            providerUser.token = AuthController.signToken({
                user_id: getStrObjectId(providerUser)
            });
            if (!providerUser.oauth)
                providerUser.oauth = {};
            providerUser.oauth.discord = {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken
            };

            const user = await userSchema.edit(providerUser);
            if (done)
                done(null, providerUser);
            return user;
        } else {
            console.log("Create new user");

            const user = await userSchema.add(new User({
                username: profile._json.email || profile.username || profile._json.username || profile.displayName || profile.id,
                oauth: {
                    discord: {
                        id: profile.id,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }));
            const token = AuthController.signToken({
                user_id: getStrObjectId(user)
            });
            user.token = token;
            await userSchema.edit(user);
            if (done)
                done(null, user);
            return user;
        }
    } catch (error) {
        if (done)
            done(error as Error);
        return undefined;
    }
}

const discordStrategy = new DiscordStrategy({
    clientID: discordConfig.clientID || "",
    clientSecret: discordConfig.clientSecret || "",
    callbackURL: discordConfig.callbackURL || "",
    scope: [Scope.IDENTIFY, Scope.EMAIL, Scope.GUILDS_JOIN],
    passReqToCallback: true
}, successfullyAuthentificated
);

passport.use("discord-web", discordStrategy);