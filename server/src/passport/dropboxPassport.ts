import { getStrObjectId } from "@classes/model.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "../controllers/AuthController";
import OAuthProvider from "../model/oAuthProvider.enum";
import passport from "passport";
import passportDropbox from "passport-dropbox-oauth2";
import { dropboxConfig } from "@config/dropboxConfig";

const DropboxStrategy = passportDropbox.Strategy;

const successfullyAuthentificated = async (accessToken: string, refreshToken: string, profile, done) => {
    const userSchema = new UserSchema();

    console.log(profile);
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
            if (oldUser.oauth?.dropbox) {
                oldUser.oauth.dropbox.accessToken = accessToken;
                oldUser.oauth.dropbox.refreshToken = refreshToken;
            }

            done(null, await userSchema.edit(oldUser));
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                username: profile.id,
                oauthLoginProvider: OAuthProvider.DROPBOX,
                oauthLoginProviderId: profile.id,
                oauth: {
                    dropbox: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            });

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

passport.use(new DropboxStrategy(
    { apiVersion: "2", ...dropboxConfig },
    successfullyAuthentificated
));