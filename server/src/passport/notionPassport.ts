import passport from "passport";

import AuthController from "../controllers/AuthController";
import { Strategy as NotionStrategy } from "../module/passport-notion";
import { notionConfig } from "../config/notionConfig";
import { UserSchema } from "@schemas/user.schema";
import OAuthProvider from "../model/oAuthProvider.enum";

const successfullyAuthentificated = async(_req, accessToken, _, oauthData, userNotion, done) => {
    const userSchema = new UserSchema();

    console.log(userNotion);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.NOTION, userNotion.person.email);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                oauthLoginProvider: OAuthProvider.NOTION,
                oauthLoginProviderId: userNotion.person.email
            });
            // save user token
            oldUser.token = token;
            await userSchema.edit(oldUser);
            done(null, oldUser);
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                oauthLoginProvider: OAuthProvider.NOTION,
                oauthLoginProviderId: userNotion.person.email
            });

            const token = AuthController.signToken({ user_id: user._id, username: userNotion.person.email });
            user.token = token;
            await userSchema.edit(user);
            done(null, user);
        }
    } catch (error) {
        done(error, null);
    }
};

passport.use(new NotionStrategy(
    {
        clientID: notionConfig.clientId || "",
        clientSecret: notionConfig.clientSecret || "",
        callbackURL: notionConfig.callbackURL || ""
    },
    successfullyAuthentificated
));