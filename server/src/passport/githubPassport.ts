import passport from "passport";
import passportGithub2 from "passport-github2";
import { Response, Request } from "express";

import { githubConfig } from "@config/githubConfig";
import { getStrObjectId } from "@classes/model.class";
import User from "@classes/user.class";
import { UserSchema } from "@schemas/user.schema";
import AuthController from "../controllers/AuthController";
import OAuthProvider from "../models/oAuthProvider.enum";

const GithubStrategy = passportGithub2.Strategy;
//TODO: do the setting part

const successfullyAuthentificated = async (req: Request, accessToken: string, refreshToken: string, profile, done: (err?: Error | null, user?: User, info?: object) => void) => {
    const userSchema = new UserSchema();

    if (req.user && req.user.data.user_id) {
        const user: User = await userSchema.get(req.user.data.user_id);

        if (!user.oauth)
            user.oauth = {};
        user.oauth.github = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        const userEdited = await userSchema.edit(user);
        if (done)
            return done(null, userEdited);
        return userEdited;
    }

    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.GITHUB, profile.username);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                user_id: getStrObjectId(oldUser),
                username: profile.username
            });
            // save user token
            oldUser.oauthLoginProvider = OAuthProvider.GITHUB;
            oldUser.oauthLoginProviderId = profile.username;
            oldUser.token = token;
            if (!oldUser.oauth)
                oldUser.oauth = {};
            oldUser.oauth.github = {
                accessToken: accessToken,
                refreshToken: refreshToken
            };
        } else {
            console.log("Create new user");

            const user = await userSchema.add(new User({
                username: profile.username,
                oauthLoginProvider: OAuthProvider.GITHUB,
                oauthLoginProviderId: profile.username,
                oauth: {
                    github: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                }
            }));
            console.log(user);

            const token = AuthController.signToken({
                user_id: getStrObjectId(user),
                username: profile.username
            });
            user.token = token;
            done(null, await userSchema.edit(user));
        }
    } catch (error) {
        done(error as Error);
    }
};

const githubStrategy = new GithubStrategy(
    {
        ...githubConfig,
        passReqToCallback: true
    },
    successfullyAuthentificated
);
passport.use("github-web", githubStrategy);