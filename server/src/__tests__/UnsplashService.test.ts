import expressInit, { app, preinitExpress } from "../init/express";
import mongoose from "mongoose";
import Database from "../init/database";
import Express from "../init/express";

import { UserSchema } from "../schemas/user.schema";

import OAuthProvider from "../models/oAuthProvider.enum";

import { TwitterService } from "../services/twitterService";
import unsplashService from "../services/unsplashService";
import { TwitterTweetConfig } from "../models/ActionConfig";
import Action, { ActionType } from "../classes/action.class";
import { TwitchStreamResult, UnsplashPostResult } from "../models/ActionResult";
import { TwitterPostTweetConfig } from "../models/ReactionConfig";
import Reaction, { ReactionType } from "../classes/reaction.class";
import ARea from "../classes/area.class";
import { ServiceType } from "../models/ServiceType";

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


        const config: TwitterTweetConfig = { username: "aypierre" };
        const actionType: ActionType = ActionType.TWITTER_MSG;
        const action: Action = { type: actionType, parameters: [], service: ServiceType.TWITTER };
        const twitchStreamResult: TwitchStreamResult = {
            Username: "",
            StreamTitle: "",
            StreamGame: "",
            StreamLanguage: "",
            StreamThumbnailUrl: "",
            StreamViewers: 0
        };
        const twitterConfig: TwitterPostTweetConfig = { message: "" };
        const reaction: Reaction = { type: ReactionType.TWITTER_MSG, parameters: [], service: ServiceType.TWITTER };
        const my_area: ARea = { trigger: { inputs: config, action: action, outputs: twitchStreamResult }, consequence: { inputs: twitterConfig, reaction: reaction } };

        expect(await unsplashService.DownloadRandomPost(my_area, "./src/__tests__/testUnsplashPost")).toBe(true);

        const result: UnsplashPostResult = my_area.trigger.outputs as UnsplashPostResult;

        expect(result.username === "").toBeFalsy;
        expect(result.created_at === "").toBeFalsy;
        expect(result.description === "").toBeFalsy;
        // expect(result.downloadPath === "").toBeFalsy;
        expect(result.likes === 0).toBeFalsy;
        expect(result.name === "").toBeFalsy;
    });
});