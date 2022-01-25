import passport from "passport";

import { ObjectId } from "@classes/model.class";
import User from "@classes/user.class";

//NOTE: serialization and deserilazition are useless because user 
//is deserialize thanks to the token stored in the session

passport.serializeUser((user: User, done) => {
    //serialize: return user token as second params of done
    console.log("Call serialize user with arg: ", user);
    done(null, user.token);
});

passport.deserializeUser<ObjectId>((token, done) => {
    //deserialize: get user from id and return the user as second params of done
    console.log("Call deserialize user with arg: ", token);
    done(null, {token});
});