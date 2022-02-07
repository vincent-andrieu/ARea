import passport from "passport";
import passportLinkedin from "passport-linkedin-oauth2";

import { linkedinConfig } from "@config/linkedinConfig";
import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import OAuthProvider from "../model/oAuthProvider.enum";
import AuthController from "../controllers/AuthController";

const LinkedinStrategy = passportLinkedin.Strategy;

const successfullyAuthentificated = async (accessToken: string, refreshToken: string, profile, done: CallableFunction) => {
    const userSchema = new UserSchema();

    console.log(profile);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.LINKEDIN, profile.id);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: profile.displayName
            });

            oldUser.oauthLoginProvider = OAuthProvider.LINKEDIN;
            oldUser.oauthLoginProviderId = profile.id;
            oldUser.token = token;
            if (oldUser.oauth?.linkedin) {
                oldUser.oauth.linkedin.accessToken = accessToken;
                oldUser.oauth.linkedin.refreshToken = refreshToken;
            }
            await userSchema.edit(oldUser);
            done(null, oldUser);
        } else {
            console.log("Create new user");

            const user = await userSchema.add(new User({
                username: profile.displayName,
                oauthLoginProvider: OAuthProvider.LINKEDIN,
                oauthLoginProviderId: profile.id,
                oauth: {
                    linkedin: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }));

            const token = AuthController.signToken({
                user_id: getStrObjectId(user),
                username: profile.displayName
            });
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
        scope: ["r_emailaddress", "r_liteprofile"]
    }, successfullyAuthentificated
));