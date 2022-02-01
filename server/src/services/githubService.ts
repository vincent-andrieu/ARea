import { env } from "process"
import { Octokit } from "octokit";

function launchOctokit(personnalAccessToken: string): Octokit {
    return new Octokit({ auth: personnalAccessToken });
    // token obtained from my github account
}

export async function NewPullRequest(repo: string, owner: string): Promise<boolean> {

    const octokit = launchOctokit(`<personnal access token here>`);

    console.log(await octokit.rest.pulls.list({
        repo: repo,
        owner: owner,
        per_page: 10
    }));

    return false;
}

export async function NewIssue(repo: string, owner: string): Promise<boolean> {

    const octokit = launchOctokit(`<personnal access token here>`);

    console.log(await octokit.rest.issues.listForRepo({
        repo: repo,
        owner: owner,
        per_page: 10,
    }));

    return false;
}

