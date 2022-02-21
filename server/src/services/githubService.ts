/* eslint-disable indent */
import { env } from "process";
import { Octokit } from "octokit";
// import User from "@classes/user.class";
import ARea from "@classes/area.class";
import { GithubResult, UnsplashPostResult } from "@models/ActionResult";
import { GithubIssueConfig, GithubPullReqConfig } from "@models/ActionConfig";
import User from "@classes/user.class";
import Action, { ActionType } from "@classes/action.class";
import { GithubCreateIssueConfig, GithubCreatePullRequestConfig } from "@models/ReactionConfig";

const pagination = 10;

export default class githubService {


    private static launchOctokit(personnalAccessToken: string): Octokit | null {

        if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET)
            return null;

        return new Octokit({
            auth: personnalAccessToken,
            oauth: {
                clientId: env.GITHUB_CLIENT_ID,
                clientSecret: env.GITHUB_CLIENT_SECRET
            }
        });
    }

    private static isNewId(area: ARea, id: number): boolean {
        const last: GithubPullReqConfig = area.trigger.inputs as GithubPullReqConfig;

        if (!last)
            return false;
        if (last.lastId === id)
            return false;
        last.lastId = id;
        return true;
    }

    private static areaSetInfos(area: ARea, repo: string, owner: string, pr) {
        const result: GithubResult = area.trigger.outputs as GithubResult;

        result.owner = owner;
        result.repository = repo;
        result.url = pr.url;
        result.id = pr.id;
        result.number = pr.number;
        result.state = pr.state;
        result.locked = pr.locked;
        result.title = pr.title;
        result.username = pr.user.login;
        result.userId = pr.user.id;
        result.userUrl = pr.user.html_url;
        result.body = pr.body;
        result.created_at = pr.created_at;
        if (!Array.isArray(pr.labels) || !Array.isArray(result.labels))
            return;
        for (const label of pr.labels)
            result.labels.push(label.name);
    }


    public static async getIfNewPullRequest(area: ARea, user: User, repo: string, owner: string): Promise<boolean> {

        if (!user || !user.oauth || !user.oauth.github)
            return false;
        const octokit = githubService.launchOctokit(user.oauth.github.accessToken);

        if (!octokit)
            return false;

        const pullRequests = await octokit.rest.pulls.list({
            repo: repo,
            owner: owner,
            per_page: pagination
        });

        if (!pullRequests || !pullRequests.data[0])
            return false;
        if (!githubService.isNewId(area, pullRequests.data[0].id))
            return false;
        githubService.areaSetInfos(area, repo, owner, pullRequests.data[0]);
        console.log("pullRequest : ", pullRequests.data[0]);

        return true;
    }

    public static async getIfNewIssue(area: ARea, user: User, repo: string, owner: string): Promise<boolean> {

        if (!user || !user.oauth || !user.oauth.github)
            return false;
        const octokit = githubService.launchOctokit(user.oauth.github.accessToken);

        if (!octokit)
            return false;

        const issues = await octokit.rest.issues.listForRepo({
            repo: repo,
            owner: owner,
            per_page: pagination
        });

        if (!issues || !issues.data || !issues.data[0])
            return false;
        console.log(issues.data[0])
        if (!githubService.isNewId(area, issues.data[0].id))
            return false;
        githubService.areaSetInfos(area, repo, owner, issues.data[0]);

        return true;
    }


    private static async CreateIssue(user: User, config: GithubCreateIssueConfig): Promise<boolean> {
        if (!user || !user.oauth || !user.oauth.github)
            return false;
        const octokit = githubService.launchOctokit(user.oauth.github.accessToken);

        if (!octokit)
            return false;

        try {
            await octokit.rest.issues.create({
                repo: config.repository,
                owner: config.owner,
                title: config.title,
                body: config.body,
                assignees: config.assignees
            });
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return false;
        }
        return true;
    }

    public static async rea_CreateIssue(area: ARea, user: User) {
        const action: Action = area.trigger.action as Action;
        const config = area.consequence.inputs as GithubCreateIssueConfig;

        try {
            switch (action.type) {
                case ActionType.UNSPLASH_POST:
                    const result = area.trigger.outputs as UnsplashPostResult;
                    // config.body += result.lastPostId; // find something interesting to add to issue

                    break;
                default:
                    console.log("todo: default action");

            }
            githubService.CreateIssue(user, config);
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return;
        }
    }

    private static async CreatePullRequest(user: User, config: GithubCreatePullRequestConfig): Promise<boolean> {
        if (!user || !user.oauth || !user.oauth.github)
            return false;
        const octokit = githubService.launchOctokit(user.oauth.github.accessToken);

        if (!octokit)
            return false;

        try {
            await octokit.rest.pulls.create({
                repo: config.repository,
                owner: config.owner,
                title: config.title,
                body: config.body,
                head: config.currentBranch,
                base: config.pullingBranch,
                maintainer_can_modify: config.maintainer_can_modify
            });
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return false;
        }
        return true;
    }

    public static async rea_CreatePullRequest(area: ARea, user: User) {
        const action: Action = area.trigger.action as Action;
        const config = area.consequence.inputs as GithubCreatePullRequestConfig;

        try {
            switch (action.type) {
                case ActionType.UNSPLASH_POST:
                    const result = area.trigger.outputs as UnsplashPostResult;
                    // config.body += result.lastPostId; // find something interesting to add to issue

                    break;
                default:
                    console.log("todo: default action");

            }
            githubService.CreatePullRequest(user, config);
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return;
        }
    }



}