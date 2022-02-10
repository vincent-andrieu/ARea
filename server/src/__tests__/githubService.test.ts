import Database from "../init/database";
import Express from "../init/express";

import { UserSchema } from "../schemas/user.schema";

import githubService from "../services/githubService";
import { GithubPullReqConfig } from "../models/ActionConfig";
import Action, { ActionType } from "../classes/action.class";
import { GithubPullReqResult } from "../models/ActionResult";
import { TwitterPostTweetConfig } from "../models/ReactionConfig";
import Reaction, { ReactionType } from "../classes/reaction.class";
import ARea from "../classes/area.class";
import { ServiceType } from "../models/ServiceType";
import User, { IRawUser } from "../classes/user.class";
import OAuthProvider from "../models/oAuthProvider.enum";

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

describe("githubService", () => {
    it("Get pull requests for a specific repository", async () => {
        const my_user: User = new User({ username: "ye", oauthLoginProvider: OAuthProvider.GITHUB, token: "", oauth: { github: { accessToken: "", refreshToken: "" } } });

        const config: GithubPullReqConfig = { owner: "octokit", repository: "octokit.js", lastId: 0 };
        const actionType: ActionType = ActionType.GITHUB_PULL_REQ;
        const action: Action = { type: actionType, parameters: [], service: ServiceType.GITHUB };
        const pullReqResult: GithubPullReqResult = {
            owner: "",
            repository: "",
            url: "",
            id: 0,
            number: 0,
            state: "",
            locked: false,
            title: "",
            username: "",
            userId: 0,
            userUrl: "",
            body: "",
            created_at: "",
            labels: []
        };
        const twitterConfig: TwitterPostTweetConfig = { message: "" };
        const reaction: Reaction = { type: ReactionType.TWITTER_MSG, parameters: [], service: ServiceType.TWITTER };
        const my_area: ARea = { trigger: { inputs: config, action: action, outputs: pullReqResult }, consequence: { inputs: twitterConfig, reaction: reaction } };

        expect(await githubService.getIfNewPullRequest(my_area, my_user, config.owner, config.repository)).toBe(true);

        const result: GithubPullReqResult = my_area.trigger.outputs as GithubPullReqResult;

        expect(result.owner === "").toBeFalsy;
        expect(result.repository === "").toBeFalsy;
        expect(result.url === "").toBeFalsy;
        expect(result.id === 0).toBeFalsy;
        expect(result.number === 0).toBeFalsy;
        expect(result.state === "").toBeFalsy;
        // expect(result.locked === true).toBeFalsy; // can' be known
        expect(result.title === "").toBeFalsy;
        expect(result.username === "").toBeFalsy;
        expect(result.userId === 0).toBeFalsy;
        expect(result.userUrl === "").toBeFalsy;
        expect(result.body === "").toBeFalsy;
        expect(result.created_at === "").toBeFalsy;
        expect(result.labels.length).toBeFalsy;
    });
});