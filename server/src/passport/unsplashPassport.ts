import { Request } from "express";
import passport from "passport";
import Unsplash from "unsplash-passport";

import { unsplashConfig } from "@config/unsplashConfig";
import User from "@classes/user.class";
import { getStrObjectId } from "@classes/model.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "@controllers/AuthController";
import OAuthProvider from "@models/oAuthProvider.enum";
import { decodeJwt } from "../middlewares/checkJwt";
import { OAuthState } from "routes/authRoutes";

const UnsplashStrategy = Unsplash.Strategy;

async function successfullyAuthentificated(req: Request, accessToken: string, refreshToken: string, profile: Profile, done?: (error: Error | null, user?: User) => void): Promise<User | undefined> {
    const userSchema = new UserSchema();

    try {
        const state: OAuthState = JSON.parse(typeof req.query.state === "string" ? req.query.state : "{}");
        if (state.token)
            req.user = decodeJwt(state.token);

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

passport.use("unsplash", new UnsplashStrategy(
    { ...unsplashConfig, passReqToCallback: true },
    successfullyAuthentificated
));