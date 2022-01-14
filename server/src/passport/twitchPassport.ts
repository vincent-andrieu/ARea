import passport from "passport";
import passportTwitch from "passport-twitch-new";
import { twitchConfig } from "../config/twitchConfig";

const TwitchStrategy = passportTwitch.Strategy;

const successfullyAuthentificated = (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const user = {
        twitchId: profile.id,
        twitchAccessToken: accessToken,
        twitchRefreshToken: refreshToken
    };
    return done(null, user);
};

passport.use(new TwitchStrategy(
    {...twitchConfig, scope: "user_read"},
    successfullyAuthentificated
));