import passport from "passport";

import AuthController from "../controllers/AuthController";
import passportTwitch from "passport-twitch-new";
import { twitchConfig } from "../config/twitchConfig";
import { UserSchema } from "@schemas/user.schema";
import OAuthProvider from "../model/oAuthProvider.enum";
import { getStrObjectId } from "@classes/model.class";

const TwitchStrategy = passportTwitch.Strategy;

const successfullyAuthentificated = async (accessToken: string, refreshToken: string, profile, done) => {
    const userSchema = new UserSchema();

    console.log(profile);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.TWITCH, profile.login);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: profile.login
            });

            oldUser.oauthLoginProvider = OAuthProvider.TWITCH;
            oldUser.oauthLoginProviderId = profile.login;
            oldUser.token = token;

            done(null, await userSchema.edit(oldUser));
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                username: profile.login,
                oauthLoginProvider: OAuthProvider.TWITCH,
                oauthLoginProviderId: profile.login
            });

            const token = AuthController.signToken({
                user_id: getStrObjectId(user),
                username: profile.login
            });
            user.token = token;
            done(null, await userSchema.edit(user));
        }
    } catch (error) {
        done(error, null);
    }
};

passport.use(new TwitchStrategy(
    {...twitchConfig, scope: "user_read"},
    successfullyAuthentificated
));