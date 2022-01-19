import passport from "passport";

import { Strategy as NotionStrategy } from "../module/passport-notion";
import { notionConfig } from "../config/notionConfig";

const successfullyAuthentificated = (_req, accessToken, _, oauthData, user, done) => {

    //console.log(JSON.stringify(oauthData));
    //console.log(JSON.stringify(user));

    const _user = {
        notionID: user.id,
        accessToken: accessToken
    };
    return done(null, _user);
};

passport.use(new NotionStrategy(
    {
        clientID: notionConfig.clientId || "",
        clientSecret: notionConfig.clientSecret || "",
        callbackURL: notionConfig.callbackURL || ""
    },
    successfullyAuthentificated
));