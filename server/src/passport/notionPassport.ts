import passport from "passport";

import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "../controllers/AuthController";
import { Strategy as NotionStrategy } from "../module/passport-notion";
import { notionConfig } from "../config/notionConfig";
import OAuthProvider from "../model/oAuthProvider.enum";

const successfullyAuthentificated = async(_req, accessToken: string, _, oauthData, userNotion, done) => {
    const userSchema = new UserSchema();

    console.log(userNotion);
    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.NOTION, userNotion.person.email);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: userNotion.person.email
            });

            oldUser.oauthLoginProvider = OAuthProvider.NOTION;
            oldUser.oauthLoginProviderId = userNotion.person.email;
            oldUser.token = token;
            if (oldUser.oauth?.notion)
                oldUser.oauth.notion.accessToken = accessToken;

            done(null, await userSchema.edit(oldUser));
        } else {
            console.log("Create new user");

            const user = await userSchema.add(new User({
                username: userNotion.person.email,
                oauthLoginProvider: OAuthProvider.NOTION,
                oauthLoginProviderId: userNotion.person.email,
                oauth: {
                    notion: {
                        accessToken: accessToken
                    }
                }
            }));

            const token = AuthController.signToken({
                user_id: getStrObjectId(user),
                username: userNotion.person.email
            });
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