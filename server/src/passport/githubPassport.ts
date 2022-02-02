import AuthController from "../controllers/AuthController";
import passport from "passport";
import passportGithub2 from "passport-github2";

import User from "@classes/user.class";
import { getStrObjectId } from "@classes/model.class";
import OAuthProvider from "../model/oAuthProvider.enum";
import { githubConfig } from "../config/githubConfig";
import { UserSchema } from "../schemas/user.schema";

const GithubStrategy = passportGithub2.Strategy;
//TODO: do the setting part

const successfullyAuthentificated = async (accessToken: string, refreshToken: string, profile, done: CallableFunction) => {
    const userSchema = new UserSchema();

    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.GITHUB, profile.username);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: profile.login
            });
            // save user token
            oldUser.oauthLoginProvider = OAuthProvider.GITHUB;
            oldUser.oauthLoginProviderId = profile.username;
            oldUser.token = token;
<<<<<<< HEAD
=======
            if (oldUser.oauth.github) {
                oldUser.oauth.github.accessToken = accessToken;
                oldUser.oauth.github.refreshToken = refreshToken;
            }
>>>>>>> 7c359be22327c428b866b21fe4d205905b3a0a58

            done(null, await userSchema.edit(oldUser));
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                username: profile.login,
                oauthLoginProvider: OAuthProvider.GITHUB,
                oauthLoginProviderId: profile.username,
                oauth: {
                    github: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            });
            console.log(user);

            const token = AuthController.signToken({
                user_id: getStrObjectId(user),
                username: profile.username
            });
            user.token = token;
            done(null, await userSchema.edit(user));
        }
    } catch (error) {
        done(error);
    }
};

passport.use(new GithubStrategy(
    githubConfig,
    successfullyAuthentificated
));