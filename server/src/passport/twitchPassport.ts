import passport from "passport";

import AuthController from "../controllers/AuthController";
import passportTwitch from "passport-twitch-new";
import { twitchConfig } from "../config/twitchConfig";
import { UserSchema } from "@schemas/user.schema";
import OAuthProvider from "../model/oAuthProvider.enum";

const TwitchStrategy = passportTwitch.Strategy;

const successfullyAuthentificated = async (accessToken, refreshToken, profile, done) => {
    const userSchema = new UserSchema();

    console.log(profile);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.TWITCH, profile.login);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                oauthLoginProvider: OAuthProvider.TWITCH,
                oauthLoginProviderId: profile.login
            });
            // save user token
            oldUser.token = token;
            await userSchema.edit(oldUser);
            done(null, oldUser);
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                oauthLoginProvider: OAuthProvider.TWITCH,
                oauthLoginProviderId: profile.login
            });

            const token = AuthController.signToken({user_id: user._id, username: profile.login})
            user.token = token;
            await userSchema.edit(user);
            done(null, user);
        }
    } catch (error) {
        done(error, null);
    }
};

passport.use(new TwitchStrategy(
    {...twitchConfig, scope: "user_read"},
    successfullyAuthentificated
));