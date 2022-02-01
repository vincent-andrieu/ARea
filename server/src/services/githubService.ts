import { env } from "process"
import { Octokit } from "octokit";

function launchOctokit(personnalAccessToken: string): Octokit {
    return new Octokit({ auth: personnalAccessToken });
    // token obtained from my github account
}

export async function isNewPullRequest(repo: string, owner: string): Promise<boolean> {

    const octokit = launchOctokit(`<personnal access token here>`);

    console.log(await octokit.rest.pulls.list({
        repo: repo,
        owner: owner,
        per_page: 10
    }));

    return false;
}

export async function isNewIssue(repo: string, owner: string): Promise<boolean> {

    const octokit = launchOctokit(`<personnal access token here>`);

    console.log(await octokit.rest.issues.listForRepo({
        repo: repo,
        owner: owner,
        per_page: 10
    }));

    return false;
}


export async function CreateIssue(
    repo: string,
    owner: string,
    title: string | number,
    body: string | undefined,
    assignee: string | null | undefined): Promise<boolean> {

    const octokit = launchOctokit(`<personnal access token here>`);

    await octokit.rest.issues.create({
        repo: repo,
        owner: owner,
        title: title,
        body: body,
        assignee: assignee
    })
    console.log();

    return false;
}

