import passport from "passport";
import passportTwitter, { Profile } from "passport-twitter";

import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "../controllers/AuthController";
import { twitterConfig } from "@config/twitterConfig";
import OAuthProvider from "../model/oAuthProvider.enum";

const TwitterStrategy = passportTwitter.Strategy;

const successfullyAuthentificated = async (accessToken: string, tokenSecret: string, profile: Profile, done: (error: unknown, user?: User) => void) => {
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
            done(null, await userSchema.edit(oldUser));
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                username: profile.username,
                oauthLoginProvider: OAuthProvider.TWITTER,
                oauthLoginProviderId: profile.username,
                oauth: {
                    twitter: {
                        accessToken: accessToken,
                        secretToken: tokenSecret
                    }
                }
            });

            const token = AuthController.signToken({
                user_id: getStrObjectId(user),
                username: profile.username
            });
            user.token = token;
            done(null, await userSchema.edit(user));
        }
    } catch (error) {
        done(error, undefined);
    }
};

passport.use(new TwitterStrategy(
    twitterConfig,
    successfullyAuthentificated
));