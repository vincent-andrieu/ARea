import passport from "passport";

import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "../controllers/AuthController";
import { Strategy as NotionStrategy } from "../module/passport-notion";
import { notionConfig } from "@config/notionConfig";
import OAuthProvider from "../models/oAuthProvider.enum";
import { decodeJwt } from "../middlewares/checkJwt";
import { NotionOAuthToken } from "module/passport-notion/strategy";
import { GetUserResponse } from "@notionhq/client/build/src/api-endpoints";
import { Request } from "express";
import { OAuthState } from "routes/authRoutes";

const successfullyAuthentificated = async (req: Request, accessToken: string, _: unknown, oauthData: NotionOAuthToken, profile: GetUserResponse, done?: (err: Error | undefined, user?: User, info?: unknown) => void): Promise<User | undefined> => {
    const userSchema = new UserSchema();

    try {
        if (profile.type !== "person")
            throw "Invalid Notion user: " + profile.type;
        const state: OAuthState = JSON.parse(typeof req.query.state === "string" ? req.query.state : "{}");
        if (state.token)
            req.user = decodeJwt(state.token);

        const userId: string | undefined = req.user?.data.user_id;
        let providerUser: User | undefined = await userSchema.findByOAuthProviderId(OAuthProvider.NOTION, profile.id);

        if (userId) {
            if (providerUser && userId !== getStrObjectId(providerUser))
                throw "Service user already connected to another user";
            const user: User = await userSchema.get(userId);

            if (!user.oauth)
                user.oauth = {};
            user.oauth.notion = {
                id: profile.id,
                accessToken: accessToken
            };
            const userEdited = await userSchema.edit(user);
            if (done)
                done(undefined, userEdited);
            return userEdited;
        }

        if (!providerUser && (profile.person.email || profile.name || profile.id))
            providerUser = await userSchema.findByUsername(profile.person.email || profile.name || profile.id);

        if (providerUser) {
            providerUser.token = AuthController.signToken({
                user_id: getStrObjectId(providerUser)
            });

            if (!providerUser.oauth)
                providerUser.oauth = {};
            providerUser.oauth.notion = {
                id: profile.id,
                accessToken: accessToken
            };

            const user = await userSchema.edit(providerUser);
            if (done)
                done(undefined, user);
            return user;
        } else {

            const user = await userSchema.add(new User({
                username: profile.person.email || profile.name || profile.id,
                oauth: {
                    notion: {
                        id: profile.id,
                        accessToken: accessToken
                    }
                }
            }));

            user.token = AuthController.signToken({
                user_id: getStrObjectId(user)
            });
            await userSchema.edit(user);
            if (done)
                done(undefined, user);
            return user;
        }
    } catch (error) {
        if (done)
            done(error as Error);
        return undefined;
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