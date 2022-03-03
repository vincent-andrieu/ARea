/* eslint-disable indent */
import { env } from "process";
import { Octokit } from "octokit";
// import User from "@classes/user.class";
import ARea from "@classes/area.class";
import { DateTimeResult, DiscordMessageResult, GithubResult, RSSResult, TwitchStreamResult, TwitterTweetResult, UnsplashPostResult } from "@models/ActionResult";
import User from "@classes/user.class";
import Action, { ActionType } from "@classes/action.class";
import { GithubCreateIssueConfig, GithubCreatePullRequestConfig } from "@models/ReactionConfig";
import { AReaSchema } from "@schemas/area.schema";
import moment from "moment";

const pagination = 10;

export default class githubService {

    private static _areaSchema = new AReaSchema();

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
        const last: GithubResult = area.trigger.outputs as GithubResult;

        if (!last || !last.lastId)
            return true;
        if (last.lastId === id)
            return false;
        return true;
    }

    private static async areaSetInfos(area: ARea, repo: string, owner: string, pr) {
        const result: GithubResult = area.trigger.outputs as GithubResult || {};

        result.lastId = pr.id;
        result.owner = owner;
        result.repository = repo;
        result.url = pr.html_url;
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
        if (Array.isArray(pr.labels)) {
            result.labels = [];
            for (const label of pr.labels)
                result.labels.push(label.name);
        }
        area.trigger.outputs = result;
        await githubService._areaSchema.edit(area);
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
        if (!githubService.isNewId(area, pullRequests.data[0].id)) {
            await this.areaSetInfos(area, repo, owner, pullRequests.data[0]);
            return false;
        }
        await this.areaSetInfos(area, repo, owner, pullRequests.data[0]);
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
        console.log(issues.data[0]);
        if (!githubService.isNewId(area, issues.data[0].id)) {
            await this.areaSetInfos(area, repo, owner, issues.data[0]);
            return false;
        }
        await githubService.areaSetInfos(area, repo, owner, issues.data[0]);

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

    private static rea_dateTimeIssue(area: ARea, config: GithubCreateIssueConfig): GithubCreateIssueConfig {
        const actionResult: DateTimeResult = area.trigger.outputs as DateTimeResult;

        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.body += "Issue created at " + actionResult.time;
        return config;
    }

    private static rea_discordIssue(area: ARea, config: GithubCreateIssueConfig): GithubCreateIssueConfig {
        const actionResult: DiscordMessageResult = area.trigger.outputs as DiscordMessageResult;

        if (!config.body)
            config.body = "";
        else
            config.body += "\n";

        config.body += actionResult.message;
        return config;
    }

    private static rea_githubIssueIssue(area: ARea, config: GithubCreateIssueConfig): GithubCreateIssueConfig {
        const actionResult: GithubResult = area.trigger.outputs as GithubResult;

        if (!config.title)
            config.title = "";
        else
            config.title += "\n";

        config.title += actionResult.title;
        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.body += actionResult.body;

        return config;
    }

    private static rea_githubPullReqIssue(area: ARea, config: GithubCreateIssueConfig): GithubCreateIssueConfig {
        const actionResult: GithubResult = area.trigger.outputs as GithubResult;

        if (!config.title)
            config.title = "";
        config.title += actionResult.title;
        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.body += actionResult.body;

        return config;
    }

    private static rea_RSSIssue(area: ARea, config: GithubCreateIssueConfig): GithubCreateIssueConfig {
        const actionResult: RSSResult = area.trigger.outputs as RSSResult;

        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.body += actionResult.url;
        return config;
    }

    private static rea_twitchIssue(area: ARea, config: GithubCreateIssueConfig): GithubCreateIssueConfig {
        const actionResult: TwitchStreamResult = area.trigger.outputs as TwitchStreamResult;

        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.title += "New stream by " + actionResult.Username + "\n";
        config.body += "Playing : " + actionResult.StreamGame + "\n";
        config.body += "Stream title : " + actionResult.StreamTitle + "\n";
        config.body += "Number of viewers : " + actionResult.StreamViewers.toString() + "\n";
        config.body += "Speaking : " + actionResult.StreamLanguage + "\n";
        config.body += "Stream thumbnail ![url](" + actionResult.StreamThumbnailUrl + ")\n";
        return config;
    }

    private static rea_twitterMsgIssue(area: ARea, config: GithubCreateIssueConfig): GithubCreateIssueConfig {
        const actionResult: TwitterTweetResult = area.trigger.outputs as TwitterTweetResult;
        const time = moment(actionResult.created_at).format("DD/MM/YYYY HH:mm");

        if (!config.title)
            config.title = "";
        else
            config.title += "\n";
        config.title += "New tweet by " + actionResult.username;
        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.body += "Content : " + actionResult.text + "\n";
        config.body += "Coordinates : " + actionResult.coordinates + "\n";
        config.body += "Timestamp : " + time + "\n";
        config.body += "Language : " + actionResult.lang + "\n";
        config.body += "Number of likes : " + actionResult.like_count + "\n";
        config.body += "Number of quotes : " + actionResult.quote_count + "\n";
        config.body += "Number of replies : " + actionResult.reply_count + "\n";
        config.body += "Number of retweets : " + actionResult.retweet_count + "\n";
        return config;
    }

    private static rea_unsplashPostIssue(area: ARea, config: GithubCreateIssueConfig): GithubCreateIssueConfig {
        const actionResult: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult;
        const time = moment(actionResult.created_at).format("DD/MM/YYYY HH:mm");

        if (!config.title)
            config.title = "";
        else
            config.title += "\n";
        config.title += "New unsplash post by " + actionResult.name + " " + actionResult.lastname;
        if (!config.body)
            config.body = "";
        else
            config.title += "\n";
        config.body += "Post desctiption : " + actionResult.description + "\n";
        config.body += "Timestamp : " + time + "\n";
        config.body += "Number of likes : " + actionResult.likes + "\n";
        config.body += "Link to the post : " + actionResult.link + "\n";
        return config;
    }

    public static async rea_CreateIssue(area: ARea, user: User) {
        const action: Action = area.trigger.action as Action;
        const config = area.consequence.inputs as GithubCreateIssueConfig;

        try {
            switch (action.type) {
                case ActionType.DATETIME:
                    this.rea_dateTimeIssue(area, config);
                    break;
                case ActionType.DISCORD_MSG:
                    this.rea_discordIssue(area, config);
                    break;
                case ActionType.GITHUB_ISSUE:
                    this.rea_githubIssueIssue(area, config);
                    break;
                case ActionType.GITHUB_PULL_REQ:
                    this.rea_githubPullReqIssue(area, config);
                    break;
                case ActionType.RSS_ENTRY:
                    this.rea_RSSIssue(area, config);
                    break;
                case ActionType.TWITCH_STREAM:
                    this.rea_twitchIssue(area, config);
                    break;
                case ActionType.TWITTER_MSG:
                    this.rea_twitterMsgIssue(area, config);
                    break;
                case ActionType.UNSPLASH_POST:
                    this.rea_unsplashPostIssue(area, config);
                    break;
                case ActionType.UNSPLASH_RANDOM_POST:
                    this.rea_unsplashPostIssue(area, config);
                    break;
                default:
                    console.log("Default action");

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
                maintainer_can_modify: config.maintainer_can_modify ? true : false
            });
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return false;
        }
        return true;
    }

    private static rea_dateTimePullReq(area: ARea, config: GithubCreatePullRequestConfig): GithubCreatePullRequestConfig {
        const actionResult: DateTimeResult = area.trigger.outputs as DateTimeResult;

        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.body += "PullReq created at " + actionResult.time;
        return config;
    }

    private static rea_discordPullReq(area: ARea, config: GithubCreatePullRequestConfig): GithubCreatePullRequestConfig {
        const actionResult: DiscordMessageResult = area.trigger.outputs as DiscordMessageResult;

        if (!config.body)
            config.body = "";
        else
            config.body += "\n";

        config.body += actionResult.message;
        return config;
    }

    private static rea_githubIssuePullReq(area: ARea, config: GithubCreatePullRequestConfig): GithubCreatePullRequestConfig {
        const actionResult: GithubResult = area.trigger.outputs as GithubResult;

        if (!config.title)
            config.title = "";
        else
            config.title += "\n";

        config.title += actionResult.title;
        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.body += actionResult.body;

        return config;
    }

    private static rea_githubPullReqPullReq(area: ARea, config: GithubCreatePullRequestConfig): GithubCreatePullRequestConfig {
        const actionResult: GithubResult = area.trigger.outputs as GithubResult;

        if (!config.title)
            config.title = "";
        config.title += ` ${actionResult.title}`;
        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.body += actionResult.body;

        return config;
    }

    private static rea_RSSPullReq(area: ARea, config: GithubCreatePullRequestConfig): GithubCreatePullRequestConfig {
        const actionResult: RSSResult = area.trigger.outputs as RSSResult;

        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.body += actionResult.url;
        return config;
    }

    private static rea_twitchPullReq(area: ARea, config: GithubCreatePullRequestConfig): GithubCreatePullRequestConfig {
        const actionResult: TwitchStreamResult = area.trigger.outputs as TwitchStreamResult;

        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.title += " New stream by " + actionResult.Username + "\n";
        config.body += "Playing : " + actionResult.StreamGame + "\n";
        config.body += "Stream title : " + actionResult.StreamTitle + "\n";
        config.body += "Number of viewers : " + actionResult.StreamViewers.toString() + "\n";
        config.body += "Speaking : " + actionResult.StreamLanguage + "\n";
        config.body += "Stream thumbnail ![url](" + actionResult.StreamThumbnailUrl + ")\n";
        return config;
    }

    private static rea_twitterMsgPullReq(area: ARea, config: GithubCreatePullRequestConfig): GithubCreatePullRequestConfig {
        const actionResult: TwitterTweetResult = area.trigger.outputs as TwitterTweetResult;
        const time = moment(actionResult.created_at).format("DD/MM/YYYY HH:mm");

        if (!config.title)
            config.title = "";
        else
            config.title += "\n";
        config.title += "New tweet by " + actionResult.username;
        if (!config.body)
            config.body = "";
        else
            config.body += "\n";
        config.body += "Content : " + actionResult.text + "\n";
        config.body += "Coordinates : " + actionResult.coordinates + "\n";
        config.body += "Timestamp : " + time + "\n";
        config.body += "Language : " + actionResult.lang + "\n";
        config.body += "Number of likes : " + actionResult.like_count + "\n";
        config.body += "Number of quotes : " + actionResult.quote_count + "\n";
        config.body += "Number of replies : " + actionResult.reply_count + "\n";
        config.body += "Number of retweets : " + actionResult.retweet_count + "\n";
        return config;
    }

    private static rea_unsplashPostPullReq(area: ARea, config: GithubCreatePullRequestConfig): GithubCreatePullRequestConfig {
        const actionResult: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult;
        const time = moment(actionResult.created_at).format("DD/MM/YYYY HH:mm");

        if (!config.title)
            config.title = "";
        else
            config.title += "\n";
        config.title += "New unsplash post by " + actionResult.name + " " + actionResult.lastname;
        if (!config.body)
            config.body = "";
        else
            config.title += "\n";
        config.body += "Post desctiption : " + actionResult.description + "\n";
        config.body += "Timestamp : " + time + "\n";
        config.body += "Number of likes : " + actionResult.likes + "\n";
        config.body += "Link to the post : " + actionResult.link + "\n";
        return config;
    }

    public static async rea_CreatePullRequest(area: ARea, user: User) {
        const action: Action = area.trigger.action as Action;
        let config = area.consequence.inputs as GithubCreatePullRequestConfig;

        try {
            switch (action.type) {
                case ActionType.DATETIME:
                    config = this.rea_dateTimePullReq(area, config);
                    break;
                case ActionType.DISCORD_MSG:
                    config = this.rea_discordPullReq(area, config);
                    break;
                case ActionType.GITHUB_ISSUE:
                    config = this.rea_githubIssuePullReq(area, config);
                    break;
                case ActionType.GITHUB_PULL_REQ:
                    config = this.rea_githubPullReqPullReq(area, config);
                    break;
                case ActionType.RSS_ENTRY:
                    config = this.rea_RSSPullReq(area, config);
                    break;
                case ActionType.TWITCH_STREAM:
                    config = this.rea_twitchPullReq(area, config);
                    break;
                case ActionType.TWITTER_MSG:
                    config = this.rea_twitterMsgPullReq(area, config);
                    break;
                case ActionType.UNSPLASH_POST:
                    config = this.rea_unsplashPostPullReq(area, config);
                    break;
                case ActionType.UNSPLASH_RANDOM_POST:
                    config = this.rea_unsplashPostPullReq(area, config);
                    break;
                default:
                    console.log("Default action");

            }
            githubService.CreatePullRequest(user, config);
        } catch (error: unknown) {
            const some_error = error as Error;

            console.log(some_error);
            return;
        }
    }
}