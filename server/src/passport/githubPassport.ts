import AuthController from "../controllers/AuthController";
import OAuthProvider from "../model/oAuthProvider.enum";
import passport from "passport";
import passportGithub2 from "passport-github2";
import { githubConfig } from "../config/githubConfig";
import { UserSchema } from "../schemas/user.schema";

const GithubStrategy = passportGithub2.Strategy;
//TODO: do the setting part

const successfullyAuthentificated = async (req, accessToken, refreshToken, profile, done: CallableFunction) => {
    const userSchema = new UserSchema();

    try {
        const oldUser = await userSchema.findByOAuthProviderId(OAuthProvider.GITHUB, profile.username);

        if (oldUser) {
            console.log("User already exist");
            const token = AuthController.signToken({
                oauthLoginProvider: OAuthProvider.GITHUB,
                oauthLoginProviderId: profile.username
            });
            // save user token
            oldUser.token = token;
            await userSchema.edit(oldUser);
            done(null, oldUser);
        } else {
            console.log("Create new user");

            const user = await userSchema.add({
                oauthLoginProvider: OAuthProvider.GITHUB,
                oauthLoginProviderId: profile.username
            });

            const token = AuthController.signToken({ user_id: user._id, username: profile.username });
            user.token = token;
            await userSchema.edit(user);
            done(null, token);
        }
    } catch (error) {
        done(error, null);
    }
};

passport.use(new GithubStrategy(
    githubConfig,
    successfullyAuthentificated
));