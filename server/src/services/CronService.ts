/* eslint-disable indent */
import cron from "node-cron";

import { AReaSchema } from "@schemas/area.schema";

import ARea from "@classes/area.class";
import User from "@classes/user.class";
import Reaction, { ReactionType } from "@classes/reaction.class";
import Action, { ActionType } from "@classes/action.class";

import { TwitchStreamConfig, UnsplashPostConfig } from "models/ActionConfig";
import { DiscordPostMsgConfig } from "models/ReactionConfig";

import { TwitterService } from "@services/twitterService";
import DiscordService from "@services/DiscordService";
import { TwitchService } from "@services/twitchService";
import RSSService from "@services/RSSService";
import unsplashService from "@services/unsplashService";
import TimeService from "@services/TimeService";
import { UserSchema } from "@schemas/user.schema";
import notionService from "./notionService";

export default class CronService {

    private static _areSchema: AReaSchema = new AReaSchema();
    private static _userSchema: UserSchema = new UserSchema();
    private static _cron?: cron.ScheduledTask = undefined;

    public static setup = (cronTime = "* * * * *") => {
        CronService._cron = cron.schedule(cronTime, this.execute, { scheduled: false });
        CronService.start();
        CronService.execute(); // first execution
        DiscordService.connect();
        TimeService.initCronActions();
    };

    public static reset = (cronTime: string) => {
        this.stop();
        CronService._cron = cron.schedule(cronTime, this.execute);
    };

    public static start = () => {
        this._cron?.start();
    };

    public static stop = () => {
        this._cron?.stop();
    };

    public static execute = async () => {
        console.log("Running CRON");

        // Fetch users
        const users = await this._userSchema.getUserList();

        users.forEach(user => {
            user.areas?.forEach(async (area) => {
                // Process action
                try {
                    await this.executeAction(area, user);
                } catch (error) {
                    console.log(`Unable to execute action: area id: ${area._id}: ${error}`);
                }
            });
        });
    };

    private static async executeAction(area: ARea, user: User) {
        const action = area.trigger.action as Action;

        switch (action.type) {
            case ActionType.CRON: {
                // cron action are scheduled
                break;
            }
            case ActionType.DATETIME: {
                if (TimeService.evalDatetime(area))
                    CronService.triggerReaction(area, user);
                break;
            }
            case ActionType.TWITCH_STREAM: {
                const username = (area.trigger.inputs as TwitchStreamConfig).username;

                if (await TwitchService.IsStreamLive(area, username))
                    CronService.triggerReaction(area, user);
                break;
            }
            case ActionType.TWITTER_MSG: {
                if (await TwitterService.GetUserLastTweet(user, area, area.trigger.inputs["username"]))
                    CronService.triggerReaction(area, user);
                break;
            }
            case ActionType.RSS_ENTRY: {
                if (await RSSService.evalAction(area))
                    CronService.triggerReaction(area, user);
                break;
            }
            case ActionType.GITHUB_ISSUE: {
                // TODO:
                break;
            }
            case ActionType.GITHUB_PULL_REQ: {
                // TODO:
                break;
            }
            case ActionType.DISCORD_MSG: {
                // See DiscordService Bot
                break;
            }
            case ActionType.UNSPLASH_POST: {
                const config: UnsplashPostConfig = area.trigger.inputs as UnsplashPostConfig;

                if (await unsplashService.downloadIfNewPost(area, config.username, config.downloadPath))
                    CronService.triggerReaction(area, user);
                break;
            }
            case ActionType.UNSPLASH_RANDOM_POST: {
                const config: UnsplashPostConfig = area.trigger.inputs as UnsplashPostConfig;

                if (await unsplashService.downloadRandomPost(area, config.downloadPath))
                    CronService.triggerReaction(area, user);
                break;
            }
            default:
                throw "CronService::executeAction: action unsupported.";
        }
    }

    /**
     * Trigger a reaction.
     * @param area ARea
     */
    public static triggerReaction(area: ARea, user: User) {
        const reaction: Reaction = area.consequence.reaction as Reaction;
        const action: Action = area.trigger.action as Action;

        switch (reaction.type) {
            case ReactionType.TWITTER_MSG:
                TwitterService.rea_Tweet(area, user);
                break;
            case ReactionType.TWITTER_BANNER:
                TwitterService.rea_UpdateBanner(area, user);
                break;
            case ReactionType.TWITTER_PP:
                TwitterService.rea_UpdatePP(area, user);
                break;
            case ReactionType.DISCORD_MSG: {
                const input: DiscordPostMsgConfig = area.consequence.inputs as DiscordPostMsgConfig;

                DiscordService.sendMessage(input.channelId, input.message);
                break;
            }
            case ReactionType.GITHUB_ISSUE:
                // githubService.rea_CreateIssue(area, user);
                break;
            case ReactionType.GITHUB_PULL:
                // githubService.rea_CreatePullRequest(area, user);
                break;
            case ReactionType.NOTION_MSG:
                notionService.rea_appendTextToPage(area, user);
                break;
            case ReactionType.DROPBOX_UPLOAD:
                // DropboxService.rea_uploadFile(area, user);

                break;

            default:
                throw "CronService: triggerReaction reaction not supported";
        }
    }
}