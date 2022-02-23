import passport from "passport";
import passportTwitter, { Profile } from "passport-twitter";

import { Request, Response } from "express";
import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "../controllers/AuthController";
import { twitterConfig, twitterConfigMobile } from "@config/twitterConfig";
import OAuthProvider from "../models/oAuthProvider.enum";
import { decodeJwt } from "../middlewares/checkJwt";
import { TwitterService } from "../services/twitterService";

const TwitterStrategy = passportTwitter.Strategy;

const successfullyAuthentificated = async (req: Request, accessToken: string, tokenSecret: string, profile: Profile, done: ((error: unknown, user?: User) => void) | undefined) => {
    const userSchema = new UserSchema();

    console.log("Twitter:", profile);
    try {
        if (typeof req.query.state === "string")
            req.user = decodeJwt(req.query.state as string);
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
            console.log("User already exist");
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
            console.log("Create new user");

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

export const TwitterMobileStrategy = async (req: Request, res: Response) => {
    const { oauth_token, oauth_verifier } = req.body;

    req.query.state = req.body.token;
    if (!oauth_token || !oauth_verifier)
        return res.status(400).send("Missing 'code' attribut");
    try {
        const oauth = await TwitterService.getAccessToken(oauth_token, oauth_verifier);
        const userProfile = await TwitterService.GetProfileInfo(oauth.oauth_token, oauth.oauth_token_secret);
        const user = await successfullyAuthentificated(req, oauth.oauth_token, oauth.oauth_token_secret, userProfile as Profile, undefined);

        if (!user)
            throw "get empty user";
        res.json(user.toRaw());
    } catch (error) {
        console.log("TwitterMobileStrategy: Error", (error as Error).toString());
        res.status(500).send((error as Error).toString());
    }
};

passport.use("twitter-web", new TwitterStrategy(
    {...twitterConfig, passReqToCallback: true},
    successfullyAuthentificated
));

passport.use("twitter-mobile", new TwitterStrategy(
    twitterConfigMobile,
    (accessToken, tokenSecret, profile, done) => {
        console.log(accessToken);
        console.log(tokenSecret);
        console.log(profile);
    }
));