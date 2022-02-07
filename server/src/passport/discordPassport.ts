import passport from "passport";

import { Profile, VerifyCallback, Scope, Strategy as DiscordStrategy, VerifyFunction } from "@oauth-everything/passport-discord";
import { discordConfig } from "@config/discordConfig";
import { UserSchema } from "@schemas/user.schema";
import OAuthProvider from "../model/oAuthProvider.enum";
import AuthController from "../controllers/AuthController";
import { getStrObjectId } from "@classes/model.class";

const successfullyAuthentificated = async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    const userSchema = new UserSchema();

    console.log(profile);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.DISCORD, profile.displayName || "");

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: profile.displayName
            });
            // save user token
            oldUser.token = token;
            if (oldUser.oauth.discord) {
                oldUser.oauth.discord.accessToken = accessToken;
                oldUser.oauth.discord.refreshToken = refreshToken;
            }
            await userSchema.edit(oldUser);
            done(null, oldUser);
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                username: profile.displayName || "",
                oauthLoginProvider: OAuthProvider.DISCORD,
                oauthLoginProviderId: profile.displayName,
                oauth: {
                    discord: {
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
            await userSchema.edit(user);
            done(null, user);
        }
    } catch (error: any) {
        done(error, undefined);
    }
};

passport.use(new DiscordStrategy({
    clientID: discordConfig.clientID || "",
    clientSecret: discordConfig.clientSecret || "",
    callbackURL: discordConfig.callbackURL || "",
    scope: [Scope.IDENTIFY, Scope.EMAIL, Scope.GUILDS_JOIN]
}, successfullyAuthentificated
));