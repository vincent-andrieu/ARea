// import expressInit, { app, preinitExpress } from "../init/express";
// import mongoose from "mongoose";
// import Database from "../init/database";

// import { TwitchService } from "../services/twitchService";
// import { ActionConfig, TwitchStreamConfig } from "../model/ActionConfig";
// import Action, { ActionType } from "../classes/action.class";
// import { TwitchStreamResult } from "../model/ActionResult";
// import { TwitterPostTweetConfig } from "../model/ReactionConfig";
// import Reaction, { ReactionType } from "../classes/reaction.class";
// import ARea from "../classes/area.class";

// /** INIT */

// beforeAll(async () => {
//     try {
//         preinitExpress();
//         //expressInit.connect();

//         mongoose.connection.dropDatabase();
//         await Database.connect();
//     } catch (err) {
//         console.log(err);
//     }
// });

// // afterAll(() => {});

// /** TESTS */

// describe("TwitchService", () => {
//     it("Check if stream is up and if parameters where changed", async () => {

//         const config: TwitchStreamConfig = { username: "aypierre" };
//         const actionType: ActionType = ActionType.TWITCH_STREAM;
//         const action: Action = { type: actionType, parameters: [] };
//         const twitchStreamResult: TwitchStreamResult = {
//             Username: "",
//             StreamTitle: "",
//             StreamGame: "",
//             StreamLanguage: "",
//             StreamThumbnailUrl: "",
//             StreamViewers: 0
//         };
//         const twitterConfig: TwitterPostTweetConfig = { message: "" };
//         const reaction: Reaction = { type: ReactionType.TWITTER_MSG, parameters: [] };
//         let my_area: ARea = { trigger: { inputs: config, action: action, outputs: twitchStreamResult }, consequence: { inputs: twitterConfig, reaction: reaction } };

//         if (await TwitchService.IsStreamLive(my_area, config.username) === false) {
//             console.log("Stream is not live, select an other streamer for test");
//             expect(true).toBe(false);
//             return;
//         }

//         const result: TwitchStreamResult = my_area.trigger.outputs as TwitchStreamResult;

//         console.log(result);
//         expect(result.Username === "").toBeFalsy;
//         expect(result.StreamGame === "").toBeFalsy;
//         expect(result.StreamLanguage === "").toBeFalsy;
//         expect(result.StreamThumbnailUrl === "").toBeFalsy;
//         expect(result.StreamTitle === "").toBeFalsy;
//     });
// });