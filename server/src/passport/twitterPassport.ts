import passport from "passport";

import AuthController from "../controllers/AuthController";
import passportTwitter from "passport-twitter";
import { twitterConfig } from "../config/twitterConfig";
import { UserSchema } from "@schemas/user.schema";
import OAuthProvider from "../model/oAuthProvider.enum";

const TwitterStrategy = passportTwitter.Strategy;

const successfullyAuthentificated = async (accessToken, refreshToken, profile, done) => {
    const userSchema = new UserSchema();

    console.log(profile);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.TWITTER, profile.username);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                oauthLoginProvider: OAuthProvider.TWITTER,
                OAuthLoginProviderId: profile.username
            });
            // save user token
            oldUser.token = token;
            await userSchema.edit(oldUser);
            done(null, oldUser);
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                oauthLoginProvider: OAuthProvider.TWITTER,
                oauthLoginProviderId: profile.username
            });

            const token = AuthController.signToken({user_id: user._id, username: profile.username});
            user.token = token;
            await userSchema.edit(user);
            done(null, user);
        }
    } catch (error) {
        done(error, null);
    }
};

passport.use(new TwitterStrategy(
    twitterConfig,
    successfullyAuthentificated
));