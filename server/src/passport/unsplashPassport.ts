import passport from "passport";
import Unsplash from "unsplash-passport";

import { unsplasConfigMobile, unsplashConfig } from "@config/unsplashConfig";
import User from "@classes/user.class";
import { getStrObjectId } from "@classes/model.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "@controllers/AuthController";
import OAuthProvider from "@models/oAuthProvider.enum";
import { decodeJwt } from "../middlewares/checkJwt";
import { Request, Response } from "express";
import unsplashService from "@services/unsplashService";

const UnsplashStrategy = Unsplash.Strategy;

async function successfullyAuthentificated(req: Request, accessToken: string, refreshToken: string, profile: Profile, done?: (error: Error | null, user?: User) => void): Promise<User | undefined> {
    const userSchema = new UserSchema();

    console.log("Unsplash:", profile);
    try {
        if (typeof req.query.state === "string")
            req.user = decodeJwt(req.query.state);

        const userId: string | undefined = req.user?.data.user_id;
        let providerUser = await userSchema.findByOAuthProviderId(OAuthProvider.UNSPLASH, profile.id);

        if (userId) {
            if (providerUser && userId !== getStrObjectId(providerUser))
                throw "Service user already connected to another user";
            const user: User = await userSchema.get(userId);

            if (!user.oauth)
                user.oauth = {};
            user.oauth.unsplash = {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            return userEdited;
        }

        if (!providerUser && (profile.email || profile.username || profile._json.name || profile.id))
            providerUser = await userSchema.findByUsername(profile.email || profile.username || profile._json.name || profile.id);

        if (providerUser) {
            console.log("User already exist");

            const token = AuthController.signToken({
                user_id: getStrObjectId(providerUser)
            });
            providerUser.token = token;
            if (!providerUser.oauth)
                providerUser.oauth = {};
            providerUser.oauth.unsplash = {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            const userEdited = await userSchema.edit(providerUser);

            if (done)
                done(null, userEdited);
            return userEdited;
        } else {
            console.log("Create new user");

            const user = await userSchema.add(new User({
                username: profile.email || profile.username || profile._json.name || profile.id,
                oauth: {
                    unsplash: {
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
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            return userEdited;
        }
    } catch (error) {
        if (done)
            done(error as Error);
        return undefined;
    }
}

export async function UnsplashMobileStrategy(req: Request, res: Response) {
    const { code } = req.body;

    req.query.state = req.body.token;
    if (!code)
        return res.status(400).send("Missing 'code' attribut");
    try {
        const oauth = await unsplashService.getAccessToken(code);
        const userProfile = await unsplashService.getUserProfile(oauth.access_token);
        const user = await successfullyAuthentificated(req, oauth.access_token, oauth.refresh_token, userProfile);

        if (!user)
            throw "get empty user";
        res.json(user.toRaw());
    } catch (error) {
        console.error("UnsplashMobileStrategy: Error", (error as Error).toString());
        res.status(500).send((error as Error).toString());
    }
}

passport.use("unsplash-web", new UnsplashStrategy(
    {...unsplashConfig, passReqToCallback: true},
    successfullyAuthentificated
));

passport.use("unsplash-mobile", new UnsplashStrategy(
    unsplasConfigMobile,
    (accessToken: string, refreshToken: string, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
    }
));