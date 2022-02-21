import passport from "passport";
import passportLinkedin from "passport-linkedin-oauth2";

import { Request } from "express";
import { linkedinConfig } from "@config/linkedinConfig";
import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import OAuthProvider from "../models/oAuthProvider.enum";
import AuthController from "../controllers/AuthController";

const LinkedinStrategy = passportLinkedin.Strategy;

const successfullyAuthentificated = async (req: Request, accessToken: string, refreshToken: string, profile, done: CallableFunction) => {
    const userSchema = new UserSchema();

    console.log(profile);
    if (req.user && req.user.data.user_id) {
        const user: User = await userSchema.get(req.user.data.user_id);

        if (!user.oauth)
            user.oauth = {};
        user.oauth.linkedin = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        const userEdited = await userSchema.edit(user);
        if (done)
            return done(null, userEdited);
        return userEdited;
    }
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
            if (!oldUser.oauth)
                oldUser.oauth = {};
            oldUser.oauth.linkedin = {
                accessToken: accessToken,
                refreshToken: refreshToken
            };
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
    {
        ...linkedinConfig,
        scope: ["r_emailaddress", "r_liteprofile"],
        passReqToCallback: true
    }, successfullyAuthentificated
));