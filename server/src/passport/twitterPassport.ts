import passport from "passport";
import passportTwitter from "passport-twitter";
import { twitterConfig } from "../config/twitterConfig";

const TwitterStrategy = passportTwitter.Strategy;

const successfullyAuthentificated = (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const user = {
        twitterId: profile.id,
        twitterAccessToken: accessToken,
        twitterRefreshToken: refreshToken
    };
    return done(null, user);
};

passport.use(new TwitterStrategy(
    twitterConfig,
    successfullyAuthentificated
));