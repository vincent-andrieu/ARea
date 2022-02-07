import passport from "passport";
// app.use(bodyParser.urlencoded({ extended: true }));

import Unsplash from "unsplash-passport";
import { UserSchema } from "../schemas/user.schema";

import AuthController from "../controllers/AuthController";
import OAuthProvider from "../model/oAuthProvider.enum";
import { unsplashConfig } from "@config/unsplashConfig";
import { getStrObjectId } from "@classes/model.class";

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
            if (oldUser.oauth.unsplash) {
                oldUser.oauth.unsplash.accessToken = accessToken;
                oldUser.oauth.unsplash.refreshToken = refreshToken;
            }

            done(null, await userSchema.edit(oldUser));
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                username: profile.login,
                oauthLoginProvider: OAuthProvider.UNSPLASH,
                oauthLoginProviderId: profile.username,
                oauth: {
                    unsplash: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
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
}

passport.use(new UnsplashStrategy(
    unsplashConfig,
    successfullyAuthentificated
));