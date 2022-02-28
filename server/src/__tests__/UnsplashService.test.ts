import Database from "../init/database";
import Express from "../init/express";
import unsplashService from "../services/unsplashService";
import { UnsplashPostConfig } from "../models/ActionConfig";
import Action, { ActionType } from "../classes/action.class";
import { UnsplashPostResult } from "../models/ActionResult";
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
        // await Express.connect();
        // await Database.connect(); // TODO: ask simon why does not contain same data than in application
    } catch (err) {
        console.log(err);
    }
});

// afterAll(() => {});

/** TESTS */

describe("UnsplashService", () => {
    it("Fetch a random picture", async () => {
        // TODO: try to make it work with or without database

        const config: UnsplashPostConfig = { username: "useless for this action", downloadPath: "./src/__tests__/testUnsplashPost" };
        const actionType: ActionType = ActionType.UNSPLASH_RANDOM_POST;
        const action: Action = { type: actionType, parameters: [], service: ServiceType.UNSPLASH };
        const unsplashPostResult: UnsplashPostResult = {
            username: "",
            downloadPath: "",
            name: "",
            lastname: "",
            lastPostId: "",
            created_at: "",
            description: "",
            likes: 0
        };
        const twitterConfig: TwitterPostTweetConfig = { message: "" };
        const reaction: Reaction = { type: ReactionType.TWITTER_MSG, parameters: [], service: ServiceType.TWITTER };
        const my_area: ARea = { trigger: { inputs: config, action: action, outputs: unsplashPostResult }, consequence: { inputs: twitterConfig, reaction: reaction } };

        expect(await unsplashService.downloadRandomPost(my_area, config.downloadPath)).toBe(true);

        const result: UnsplashPostResult = my_area.trigger.outputs as UnsplashPostResult;

        expect(result.username === "").toBeFalsy;
        expect(result.created_at === "").toBeFalsy;
        expect(result.description === "").toBeFalsy;
        // expect(result.downloadPath === "").toBeFalsy;
        expect(result.name === "").toBeFalsy;
        expect(result.likes === 0).toBeFalsy;
    });
});