import passport from "passport";
import passportGithub2 from "passport-github2";
import { githubConfig } from "../config/githubConfig";

const GithubStrategy = passportGithub2.Strategy;

const successfullyAuthentificated = (accessToken: string, refreshToken: string, profile, done: CallableFunction) => {
    //TODO: find a user in db with the profile.id
    //if the user is not find => create a new user
    //return the object user
    const user = {
        githubID: profile.id,
        githubAccessToken: accessToken,
        githubRefreshToken: refreshToken
    };
    return done(null, user);
};

passport.use(new GithubStrategy(
    githubConfig,
    successfullyAuthentificated
));