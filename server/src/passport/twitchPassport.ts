import { Request, Response } from "express";
import passport from "passport";
import passportTwitch from "passport-twitch-new";

import { twitchConfig, twitchMobileConfig } from "@config/twitchConfig";
import User from "@classes/user.class";
import { getStrObjectId } from "@classes/model.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "@controllers/AuthController";
import { TwitchService } from "../services/twitchService";
import OAuthProvider from "../models/oAuthProvider.enum";

const TwitchStrategy = passportTwitch.Strategy;

const successfullyAuthentificated = async (accessToken: string, refreshToken: string, profile, done) => {
    const userSchema = new UserSchema();

    console.log(profile);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.TWITCH, profile.login);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: profile.login
            });

            oldUser.oauthLoginProvider = OAuthProvider.TWITCH;
            oldUser.oauthLoginProviderId = profile.login;
            oldUser.token = token;
            if (!oldUser.oauth)
                oldUser.oauth = {};
            oldUser.oauth.twitch = {
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            const user = await userSchema.edit(oldUser);
            if (done)
                done(null, user);
            else
                return user;
        } else {
            console.log("Create new user");

            const user = await userSchema.add(new User({
                username: profile.login,
                oauthLoginProvider: OAuthProvider.TWITCH,
                oauthLoginProviderId: profile.login,
                oauth: {
                    twitch: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }));

            const token = AuthController.signToken({
                user_id: getStrObjectId(user),
                username: profile.login
            });
            user.token = token;
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            else
                return userEdited;
        }
    } catch (error: unknown) {
        console.log("twitchStrategy callback error: ", (error as Error).toString());
        if (done)
            done(error, null);
    }
};

export async function TwitchMobileStrategy(req: Request, res: Response) {
    const code = req.body.code;

    if (code == undefined)
        return res.status(400).send("Missing 'code' attribut");
    try {
        console.log(code);
        const oauth = await TwitchService.getAccessToken(code);
        console.log(oauth);
        const userProfile = await TwitchService.getUserProfile(oauth.access_token);
        console.log(userProfile);
        const user = await successfullyAuthentificated(oauth.access_token, oauth.refresh_token, userProfile, undefined);
        console.log(user);

        if (!user)
            throw "get empty user";
        res.json(user.toRaw());
    } catch (error) {
        console.error("TwitchMobileStrategy: Error", (error as Error).toString());
        res.status(500).send((error as Error).toString());
    }
}

passport.use("twitch-web", new TwitchStrategy(
    { ...twitchConfig, scope: "user_read" },
    successfullyAuthentificated
));

passport.use("twitch-mobile", new TwitchStrategy(
    { ...twitchMobileConfig, scope: "user_read" },
    (accessToken: string, refreshToken: string, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        console.log(done);
    }
));