import passport from "passport";

import { Profile, VerifyCallback, Scope, Strategy as DiscordStrategy, VerifyFunction} from "@oauth-everything/passport-discord";
import { discordConfig } from "../config/discordConfig";
import { UserSchema } from "@schemas/user.schema";
import OAuthProvider from "../model/oAuthProvider.enum";
import AuthController from "../controllers/AuthController";

const successfullyAuthentificated = async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    const userSchema = new UserSchema();

    console.log(profile);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.DISCORD, profile.displayName || "");

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                oauthLoginProvider: OAuthProvider.DISCORD,
                oauthLoginProviderId: profile.displayName
            });
            // save user token
            oldUser.token = token;
            await userSchema.edit(oldUser);
            done(null, oldUser);
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                oauthLoginProvider: OAuthProvider.DISCORD,
                oauthLoginProviderId: profile.displayName
            });

            const token = AuthController.signToken({user_id: user._id, username: profile.displayName})
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