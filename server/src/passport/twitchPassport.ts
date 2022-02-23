import { Request, Response } from "express";
import passport from "passport";
import passportTwitch from "passport-twitch-new";

import { twitchConfig, twitchMobileConfig } from "@config/twitchConfig";
import User from "@classes/user.class";
import { getStrObjectId } from "@classes/model.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "@controllers/AuthController";
import { TwitchService } from "@services/twitchService";
import OAuthProvider from "@models/oAuthProvider.enum";
import { decodeJwt } from "../middlewares/checkJwt";

const TwitchStrategy = passportTwitch.Strategy;

const successfullyAuthentificated = async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done?: (error: Error | null, user?: User) => void): Promise<User | undefined> => {
    const userSchema = new UserSchema();

    console.log("Twitch:", profile);
    try {
        if (typeof req.query.state === "string")
            req.user = decodeJwt(req.query.state as string);

        const userId: string | undefined = req.user?.data.user_id;
        let providerUser = await userSchema.findByOAuthProviderId(OAuthProvider.TWITCH, profile.id);

        if (userId) {
            if (providerUser && userId !== getStrObjectId(providerUser))
                throw "Service user already connected to another user";
            const user: User = await userSchema.get(userId);

            if (!user.oauth)
                user.oauth = {};
            user.oauth.twitch = {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            return userEdited;
        }

        if (!providerUser && (profile.email || profile.login || profile.display_name))
            providerUser = await userSchema.findByUsername(profile.email || profile.login || profile.display_name);

        if (providerUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(providerUser)
            });

            providerUser.token = token;
            if (!providerUser.oauth)
                providerUser.oauth = {};
            providerUser.oauth.twitch = {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken
            };

            const user = await userSchema.edit(providerUser);
            if (done)
                done(null, user);
            return user;
        } else {
            console.log("Create new user");

            const user = await userSchema.add(new User({
                username: profile.email || profile.login || profile.display_name,
                oauth: {
                    twitch: {
                        id: profile.id,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }));

            user.token = AuthController.signToken({
                user_id: getStrObjectId(user)
            });
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            return userEdited;
        }
    } catch (error) {
        console.log("twitchStrategy callback error: ", (error as Error).toString());
        if (done)
            done(error as Error);
        return undefined;
    }
};

export async function TwitchMobileStrategy(req: Request, res: Response) {
    const code = req.body.code;

    req.query.state = req.body.token;
    if (!code)
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