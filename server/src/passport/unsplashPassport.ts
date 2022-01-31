import passport from "passport";
// app.use(bodyParser.urlencoded({ extended: true }));

import Unsplash from "unsplash-passport"
import { UserSchema } from "../schemas/user.schema";

import AuthController from "../controllers/AuthController";
import OAuthProvider from "../model/oAuthProvider.enum";
import { unsplashConfig } from "../config/unsplashConfig";

const UnsplashStrategy = Unsplash.Strategy;


// export async function unsplashPassport(profile): Promise<void> {
async function successfullyAuthentificated(accessToken, secretToken, profile, done) {

    const userSchema = new UserSchema();

    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.UNSPLASH, profile.username);
        var actUser = oldUser;
        var token: string;

        if (oldUser) {
            console.log("User already exist");

            token = AuthController.signToken({
                oauthLoginProvider: OAuthProvider.UNSPLASH,
                OAuthLoginProviderId: profile.username
            });
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                oauthLoginProvider: OAuthProvider.UNSPLASH,
                oauthLoginProviderId: profile.username
            });
            token = AuthController.signToken({ user_id: user._id, username: profile.username });
            actUser = user;
        }
        actUser.token = token;
        await userSchema.edit(actUser);
        done(null, actUser);

    } catch (error) {
        done(error, null);
    }
}

passport.use(new UnsplashStrategy(
    unsplashConfig,
    successfullyAuthentificated
));