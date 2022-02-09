import passport from "passport";
import Unsplash from "unsplash-passport";


import { unsplasConfigMobile, unsplashConfig } from "@config/unsplashConfig";
import User from "@classes/user.class";
import { getStrObjectId } from "@classes/model.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "@controllers/AuthController";
import OAuthProvider from "@models/oAuthProvider.enum";
import { Request, Response } from "express";
import unsplashService from "@services/unsplashService";

const UnsplashStrategy = Unsplash.Strategy;

// export async function unsplashPassport(profile): Promise<void> {
async function successfullyAuthentificated(accessToken: string, refreshToken: string, profile, done) {

    const userSchema = new UserSchema();

    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.UNSPLASH, profile.username);

        if (oldUser) {
            console.log("User already exist");

            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: profile.displayName
            });
            oldUser.oauthLoginProvider = OAuthProvider.UNSPLASH;
            oldUser.oauthLoginProviderId = profile.displayName;
            oldUser.token = token;
            if (oldUser.oauth?.unsplash) {
                oldUser.oauth.unsplash.accessToken = accessToken;
                oldUser.oauth.unsplash.refreshToken = refreshToken;
            }
            const userEdited = await userSchema.edit(oldUser);

            if (done)
                done(null, userEdited);
            else
                return userEdited;
        } else {
            console.log("Create new user");

            const user = await userSchema.add(new User({
                username: profile.username,
                oauthLoginProvider: OAuthProvider.UNSPLASH,
                oauthLoginProviderId: profile.username,
                oauth: {
                    unsplash: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }));
            const token = AuthController.signToken({
                user_id: getStrObjectId(user),
                username: profile.username
            });
            user.token = token;
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            else
                return userEdited;
        }
    } catch (error) {
        if (done)
            done(error, undefined);
    }
}

export async function UnsplashMobileStrategy(req: Request, res: Response) {
    const { code } = req.body;

    if (!code)
        return res.status(400).send("Missing 'code' attribut");
    try {
        const oauth = await unsplashService.getAccessToken(code);
        const userProfile = await unsplashService.getUserProfile(oauth.access_token);
        const user = await successfullyAuthentificated(oauth.access_token, oauth.refresh_token, userProfile, undefined);

        if (!user)
            throw "get empty user";
        res.json(user.toRaw());
    } catch (error) {
        console.error("UnsplashMobileStrategy: Error", (error as Error).toString());
        res.status(500).send((error as Error).toString());
    }
}

passport.use("unsplash-web", new UnsplashStrategy(
    unsplashConfig,
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