import passport from "passport";

import { decodeJwt } from "../middlewares/checkJwt";

passport.serializeUser<string>((user: any, done) => { // user is a User class
    done(null, user.token);
});

passport.deserializeUser<string>((token, done) => {
    if (!token || token.length === 0)
        done(null, false);

    try {
        const user: Express.User = decodeJwt(token);

        user.data.token = token;
        done(null, user);
    } catch(error) {
        done(error);
    }
});