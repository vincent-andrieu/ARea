import passport from "passport";

import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "../controllers/AuthController";
import { Strategy as NotionStrategy } from "../module/passport-notion";
import { notionConfig } from "@config/notionConfig";
import OAuthProvider from "../models/oAuthProvider.enum";
import { decodeJwt } from "../middlewares/checkJwt";

const successfullyAuthentificated = async (req, accessToken: string, _, oauthData, userNotion, done) => {
    const userSchema = new UserSchema();

    console.log(userNotion);
    try {
        if (!req.user && typeof req.query.state === "string")
            req.user = decodeJwt(req.query.state as string);

        const userId: string | undefined = req.user?.data.user_id;

        if (userId) {
            const user: User = await userSchema.get(userId);

            if (!user.oauth)
                user.oauth = {};
            user.oauth.notion = {
                accessToken: accessToken
            };
            const userEdited = await userSchema.edit(user);
            if (done)
                return done(null, userEdited);
            return userEdited;
        }

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
            if (!oldUser.oauth)
                oldUser.oauth = {};
            oldUser.oauth.notion = {
                accessToken: accessToken
            };

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