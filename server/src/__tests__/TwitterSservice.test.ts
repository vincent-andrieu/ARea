import expressInit, { app, preinitExpress } from "../init/express";
import mongoose from "mongoose";
import Database from "../init/database";
import Express from "../init/express";

import { UserSchema } from "../schemas/user.schema";

import OAuthProvider from "../model/oAuthProvider.enum";

import { TwitterService } from "../services/twitterService";
import { ActionConfig, TwitchStreamConfig, TwitterTweetConfig } from "../model/ActionConfig";
import Action, { ActionType } from "../classes/action.class";
import { TwitchStreamResult } from "../model/ActionResult";
import { TwitterPostTweetConfig } from "../model/ReactionConfig";
import Reaction, { ReactionType } from "../classes/reaction.class";
import ARea from "../classes/area.class";

/** INIT */

beforeAll(async () => {

    try {
        // preinitExpress();
        //        //expressInit.connect();

        // mongoose.connection.dropDatabase();
        await Express.connect();
        await Database.connect(); // TODO: ask aurelien why does not contain same data than in application
    } catch (err) {
        console.log(err);
    }
});

// afterAll(() => {});

/** TESTS */

describe("TwitterService", () => {
    it("Check if user has tweeted", async () => {
        // TODO: try to make it work with or without database

        const userSchema = new UserSchema();

        const user = await userSchema.findByOAuthProviderId(OAuthProvider.TWITTER, "aaarthurJ" /* TODO: ask aurelien how it is obtained in profile.username in unsplashPassport */);

        if (!user) {
            console.log("User has never registered with oauth, do it before test");
            expect(true).toBe(false);
            return;
        }

        const config: TwitterTweetConfig = { username: "aypierre" };
        const actionType: ActionType = ActionType.TWITTER_MSG;
        const action: Action = { type: actionType, parameters: [] };
        const twitchStreamResult: TwitchStreamResult = {
            Username: "",
            StreamTitle: "",
            StreamGame: "",
            StreamLanguage: "",
            StreamThumbnailUrl: "",
            StreamViewers: 0
        };
        const twitterConfig: TwitterPostTweetConfig = { message: "" };
        const reaction: Reaction = { type: ReactionType.TWITTER_MSG, parameters: [] };
        let my_area: ARea = { trigger: { inputs: config, action: action, outputs: twitchStreamResult }, consequence: { inputs: twitterConfig, reaction: reaction } };

        if (await TwitterService.GetUserLastTweet(user/* TODO: get user from db */, my_area, config.username) === false) {
            console.log("User has no tweet, select an other user for test");
            expect(true).toBe(false);
            return;
        }

        // const result: TwitchStreamResult = my_area.trigger.outputs as TwitchStreamResult;

        // console.log(result);
        // expect(result.Username === "").toBeFalsy;
    });
});