import passport from "passport";

import { ObjectId } from "@classes/model.class";

passport.serializeUser((user, done) => {
    //serialize: return user id as second params of done
    //TODO: change when use DB
    console.log("Call serialize user with arg: ", user);
    done(null, user);
});

passport.deserializeUser<ObjectId>((id, done) => {
    //deserialize: get user from id and return the user as second params of done
    //TODO: change when use DB
    console.log("Call deserialize user with arg: ", id);
    done(null, id);
});