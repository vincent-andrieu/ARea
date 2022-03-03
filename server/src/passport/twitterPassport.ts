import { Request } from "express";
import passport from "passport";
import passportTwitter, { Profile } from "passport-twitter";

import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "../controllers/AuthController";
import { twitterConfig } from "@config/twitterConfig";
import OAuthProvider from "../models/oAuthProvider.enum";
import { decodeJwt } from "../middlewares/checkJwt";
import { OAuthState } from "../routes/authRoutes";

const TwitterStrategy = passportTwitter.Strategy;

const successfullyAuthentificated = async (req: Request, accessToken: string, tokenSecret: string, profile: Profile, done: ((error: unknown, user?: User) => void) | undefined) => {
    const userSchema = new UserSchema();

    try {
        const state: OAuthState = req.session?.state || {};
        if (state.token)
            req.user = decodeJwt(state.token);

        const userId: string | undefined = req.user?.data.user_id;
        let providerUser = await userSchema.findByOAuthProviderId(OAuthProvider.TWITTER, profile.id);

        if (userId) {
            if (providerUser && userId !== getStrObjectId(providerUser))
                throw "Service user already connected to another user";
            const user: User = await userSchema.get(userId);

            if (!user.oauth)
                user.oauth = {};
            user.oauth.twitter = {
                id: profile.id,
                accessToken: accessToken,
                secretToken: tokenSecret
            };
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            return userEdited;
        }

        if (!providerUser && (profile.username || profile.displayName || profile.id))
            providerUser = await userSchema.findByUsername(profile.username || profile.displayName || profile.id);

        if (providerUser) {
            providerUser.token = AuthController.signToken({
                user_id: getStrObjectId(providerUser)
            });

            if (!providerUser.oauth)
                providerUser.oauth = {};
            providerUser.oauth.twitter = {
                id: profile.id,
                accessToken: accessToken,
                secretToken: tokenSecret
            };
            const userEdited = await userSchema.edit(providerUser);
            if (done)
                done(null, userEdited);
            return userEdited;
        } else {

            const user = await userSchema.add(new User({
                username: profile.username || profile.displayName || profile.id,
                oauth: {
                    twitter: {
                        id: profile.id,
                        accessToken: accessToken,
                        secretToken: tokenSecret
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
        if (done)
            done(error, undefined);
        return undefined;
    }
};

passport.use("twitter", new TwitterStrategy(
    { ...twitterConfig, passReqToCallback: true },
    successfullyAuthentificated
));