import passport from "passport";
import passportDropbox from "passport-dropbox-oauth2";
import { Request } from "express";

import { dropboxConfig } from "@config/dropboxConfig";
import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "@controllers/AuthController";
import OAuthProvider from "@models/oAuthProvider.enum";

const DropboxStrategy = passportDropbox.Strategy;

const successfullyAuthentificated = async (req: Request, accessToken: string, refreshToken: string, profile, done) => {
    const userSchema = new UserSchema();

    console.log(profile);
    if (req.user && req.user.data.user_id) {
        const user: User = await userSchema.get(req.user.data.user_id);

        if (!user.oauth)
            user.oauth = {};
        user.oauth.dropbox = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        const userEdited = await userSchema.edit(user);
        if (done)
            return done(null, userEdited);
        return userEdited;
    }

    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.DROPBOX, profile.id);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: profile.id
            });

            oldUser.oauthLoginProvider = OAuthProvider.DROPBOX;
            oldUser.oauthLoginProviderId = profile.id;
            oldUser.token = token;
            if (!oldUser.oauth)
                oldUser.oauth = {};
            oldUser.oauth.dropbox = {
                accessToken: accessToken,
                refreshToken: refreshToken
            };

            done(null, await userSchema.edit(oldUser));
        } else {
            console.log("Create new user");

            const user = await userSchema.add(new User({
                username: profile.id,
                oauthLoginProvider: OAuthProvider.DROPBOX,
                oauthLoginProviderId: profile.id,
                oauth: {
                    dropbox: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }));

            const token = AuthController.signToken({
                user_id: getStrObjectId(user),
                username: profile.login
            });
            user.token = token;
            done(null, await userSchema.edit(user));
        }

    } catch (error) {
        done(error, null);
    }
};

passport.use("dropbox-oauth2-web", new DropboxStrategy(
    { apiVersion: "2", ...dropboxConfig, passReqToCallback: true },
    successfullyAuthentificated
));