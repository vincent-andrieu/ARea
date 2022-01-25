import passport from "passport";

import AuthController from "../controllers/AuthController";
import passportLinkedin from "passport-linkedin-oauth2";
import { linkedinConfig } from "../config/linkedinConfig";
import { UserSchema } from "@schemas/user.schema";
import OAuthProvider from "../model/oAuthProvider.enum";

const LinkedinStrategy = passportLinkedin.Strategy;

const successfullyAuthentificated = async (accessToken, refreshToken, profile, done: CallableFunction) => {
    const userSchema = new UserSchema();

    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.LINKEDIN, profile.id);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                oauthLoginProvider: OAuthProvider.LINKEDIN,
                oauthLoginProviderId: profile.displayName
            });
            // saver user token;
            oldUser.token = token;
            await userSchema.edit(oldUser);
            done(null, oldUser);
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                oauthLoginProvider: OAuthProvider.LINKEDIN,
                oauthLoginProviderId: profile.id
            });

            const token = AuthController.signToken({ user_id: user._id, username: profile.displayName});
            user.token = token;
            await userSchema.edit(user);
            done(null, user);
        }
    } catch (error) {
        done(error, null);
    }
};

passport.use(new LinkedinStrategy(
    {...linkedinConfig, 
        scope: ["r_emailaddress", "r_liteprofile"],
        state: true
    }, successfullyAuthentificated
));