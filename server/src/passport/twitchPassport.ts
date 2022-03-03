import { Request } from "express";
import passport from "passport";
import passportTwitch from "passport-twitch-new";

import { twitchConfig } from "@config/twitchConfig";
import User from "@classes/user.class";
import { getStrObjectId } from "@classes/model.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "@controllers/AuthController";
import OAuthProvider from "@models/oAuthProvider.enum";
import { decodeJwt } from "../middlewares/checkJwt";
import { OAuthState } from "routes/authRoutes";

const TwitchStrategy = passportTwitch.Strategy;

const successfullyAuthentificated = async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done?: (error: Error | null, user?: User) => void): Promise<User | undefined> => {
    const userSchema = new UserSchema();

    try {
        const state: OAuthState = JSON.parse(typeof req.query.state === "string" ? req.query.state : "{}");
        if (state.token)
            req.user = decodeJwt(state.token);

        const userId: string | undefined = req.user?.data.user_id;
        let providerUser = await userSchema.findByOAuthProviderId(OAuthProvider.TWITCH, profile.id);

        if (userId) {
            if (providerUser && userId !== getStrObjectId(providerUser))
                throw "Service user already connected to another user";
            const user: User = await userSchema.get(userId);

            if (!user.oauth)
                user.oauth = {};
            user.oauth.twitch = {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            return userEdited;
        }

        if (!providerUser && (profile.email || profile.login || profile.display_name))
            providerUser = await userSchema.findByUsername(profile.email || profile.login || profile.display_name);

        if (providerUser) {
            const token = AuthController.signToken({
                user_id: getStrObjectId(providerUser)
            });

            providerUser.token = token;
            if (!providerUser.oauth)
                providerUser.oauth = {};
            providerUser.oauth.twitch = {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken
            };

            const user = await userSchema.edit(providerUser);
            if (done)
                done(null, user);
            return user;
        } else {

            const user = await userSchema.add(new User({
                username: profile.email || profile.login || profile.display_name,
                oauth: {
                    twitch: {
                        id: profile.id,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }));

            user.token = AuthController.signToken({
                user_id: getStrObjectId(user)
            });
            const userEdited = await userSchema.edit(user);
            if (done)
                done(null, userEdited);
            return userEdited;
        }
    } catch (error) {
        console.error("twitchStrategy callback error: ", (error as Error).toString());
        if (done)
            done(error as Error);
        return undefined;
    }
};

passport.use("twitch", new TwitchStrategy(
    { ...twitchConfig, scope: "user_read", passReqToCallback: true },
    successfullyAuthentificated
));