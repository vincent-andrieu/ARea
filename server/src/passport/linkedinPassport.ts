import passport from "passport";
import passportLinkedin, { Profile } from "passport-linkedin-oauth2";

import { Request } from "express";
import { linkedinConfig } from "@config/linkedinConfig";
import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import OAuthProvider from "../models/oAuthProvider.enum";
import { decodeJwt } from "../middlewares/checkJwt";
import AuthController from "../controllers/AuthController";
import { OAuthState } from "routes/authRoutes";

const LinkedinStrategy = passportLinkedin.Strategy;

async function successfullyAuthentificated(req: Request, accessToken: string, refreshToken: string, profile: Profile, done?: (error: Error | null, user?: User) => void): Promise<User | undefined> {
    const userSchema = new UserSchema();

    try {
        const state: OAuthState = JSON.parse(typeof req.query.state === "string" ? req.query.state : "{}");
        if (state.token)
            req.user = decodeJwt(state.token);

        const userId: string | undefined = req.user?.data.user_id;
        let providerUser = await userSchema.findByOAuthProviderId(OAuthProvider.LINKEDIN, profile.id);

        if (userId) {
            if (providerUser && userId !== getStrObjectId(providerUser))
                throw "Service user already connected to another user";
            const user: User = await userSchema.get(userId);

            if (!user.oauth)
                user.oauth = {};
            user.oauth.linkedin = {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            return userEdited;
        }

        if (!providerUser && (profile._json.emails ? profile._json.emails[0]?.value : profile.displayName))
            providerUser = await userSchema.findByUsername(profile._json.emails ? profile._json.emails[0]?.value : profile.displayName);

        if (providerUser) {
            providerUser.token = AuthController.signToken({
                user_id: getStrObjectId(providerUser)
            });

            if (!providerUser.oauth)
                providerUser.oauth = {};
            providerUser.oauth.linkedin = {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken
            };

            const user = await userSchema.edit(providerUser);
            if (done)
                done(null, providerUser);
            return user;
        } else {
            const user = await userSchema.add(new User({
                username: profile._json.emails ? profile._json.emails[0]?.value : profile.displayName,
                oauth: {
                    linkedin: {
                        id: profile.id,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }));

            user.token = AuthController.signToken({
                user_id: getStrObjectId(user)
            });
            await userSchema.edit(user);
            if (done)
                done(null, user);
            return user;
        }
    } catch (error) {
        if (done)
            done(error as Error);
        return undefined;
    }
}

passport.use(new LinkedinStrategy(
    {
        ...linkedinConfig,
        scope: ["r_emailaddress", "r_liteprofile"],
        passReqToCallback: true
    }, successfullyAuthentificated
));