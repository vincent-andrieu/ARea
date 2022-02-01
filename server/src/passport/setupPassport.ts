import passport from "passport";
import jwt from "jsonwebtoken";

import { serverConfig } from "@config/serverConfig";

passport.serializeUser<string>((user: any, done) => { // user is a User class
    done(null, user.token);
});

passport.deserializeUser<string>((token, done) => {
    if (!token || token.length === 0)
        done(null, false);

    const user: Express.User = jwt.verify(token, serverConfig.jwtSecret) as Express.User;

    user.data.token = token;
    done(null, user);
});