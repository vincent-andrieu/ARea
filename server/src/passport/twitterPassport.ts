import passport from "passport";
import passportTwitter, { Profile } from "passport-twitter";

import { Request, Response } from "express";
import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "../controllers/AuthController";
import { twitterConfig, twitterConfigMobile } from "@config/twitterConfig";
import OAuthProvider from "../model/oAuthProvider.enum";
import { TwitterService } from "../services/twitterService";

const TwitterStrategy = passportTwitter.Strategy;

const successfullyAuthentificated = async (accessToken: string, tokenSecret: string, profile: Profile, done: ((error: unknown, user?: User) => void) | undefined) => {
    const userSchema = new UserSchema();
    // console.log("accessToken : ", accessToken); TODO: remove after use of the variable
    // console.log("secretToken : ", secretToken); TODO: remove after use of the variable

    console.log(profile);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.TWITTER, profile.username);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: profile.username
            });

            oldUser.oauthLoginProvider = OAuthProvider.TWITTER;
            oldUser.oauthLoginProviderId = profile.username;
            oldUser.token = token;
            if (oldUser.oauth?.twitter) {
                oldUser.oauth.twitter.accessToken = accessToken;
                oldUser.oauth.twitter.secretToken = tokenSecret;
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
                oauthLoginProvider: OAuthProvider.TWITTER,
                oauthLoginProviderId: profile.username,
                oauth: {
                    twitter: {
                        accessToken: accessToken,
                        secretToken: tokenSecret
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
            return userEdited;
        }
    } catch (error) {
        if (done)
            done(error, undefined);
    }
};

export const TwitterMobileStrategy = async (req: Request, res: Response) => {
    const { oauth_token, oauth_verifier } = req.body;

    if (!oauth_token || !oauth_verifier)
        return res.status(400).send("Missing 'code' attribut");
    try {
        const oauth = await TwitterService.getAccessToken(oauth_token, oauth_verifier);
        const userProfile = await TwitterService.GetProfileInfo(oauth.oauth_token, oauth.oauth_token_secret);
        const user = await successfullyAuthentificated(oauth.oauth_token, oauth.oauth_token_secret, userProfile as Profile, undefined);

        if (!user)
            throw "get empty user";
        res.json(user.toRaw());
    } catch (error) {
        console.log("TwitterMobileStrategy: Error", (error as Error).toString());
        res.status(500).send((error as Error).toString());
    }
};

passport.use("twitter-web", new TwitterStrategy(
    twitterConfig,
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