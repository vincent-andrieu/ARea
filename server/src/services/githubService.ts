import { env } from "process";
import { Octokit } from "octokit";
// import User from "@classes/user.class";
import ARea from "@classes/area.class";
import { GithubResult } from "@models/ActionResult";
import { GithubIssueConfig, GithubPullReqConfig } from "@models/ActionConfig";
import User from "@classes/user.class";

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
        if (!githubService.isNewId(area, issues.data[0].id))
            return false;
        githubService.areaSetInfos(area, repo, owner, issues.data[0]);

        return true;
    }

    /*
    export async  CreateIssue(
        repo: string,
        owner: string,
        title: string | number,
        body: string | undefined,
        assignee: string | null | undefined): Promise<boolean> {

        const octokit = launchOctokit("<personnal access token here>");

        await octokit.rest.issues.create({
            repo: repo,
            owner: owner,
            title: title,
            body: body,
            assignee: assignee
        });
        return false;
    }*/

}