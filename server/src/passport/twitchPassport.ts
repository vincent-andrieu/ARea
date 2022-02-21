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

const successfullyAuthentificated = async (req: Request, accessToken: string, refreshToken: string, profile, done?: (error: Error | null, user?: User) => void) => {
    const userSchema = new UserSchema();

    try {
        if (req.user?.data.user_id) {
            console.log("userId:", req.user?.data.user_id);
            const user: User = await userSchema.get(req.user.data.user_id);

            if (!user.oauth)
                user.oauth = {};
            user.oauth.twitch = {
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            const userEdited = await userSchema.edit(user);
            if (done)
                return done(null, userEdited);
            return userEdited;
        }
        console.log(profile);
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
    } catch (error) {
        console.log("twitchStrategy callback error: ", (error as Error).toString());
        if (done)
            done(error as Error);
    }
};

export async function TwitchMobileStrategy(req: Request, res: Response) {
    const code = req.body.code;

    if (code == undefined)
        return res.status(400).send("Missing 'code' attribut");
    try {
        const oauth = await TwitchService.getAccessToken(code);
        const userProfile = await TwitchService.getUserProfile(oauth.access_token);
        const user = await successfullyAuthentificated(req, oauth.access_token, oauth.refresh_token, userProfile);

        if (!user)
            throw "get empty user";
        res.json(user.toRaw());
    } catch (error) {
        console.error("TwitchMobileStrategy: Error", (error as Error).toString());
        res.status(500).send((error as Error).toString());
    }
}

passport.use("twitch-web", new TwitchStrategy(
    { ...twitchConfig, scope: "user_read", passReqToCallback: true },
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