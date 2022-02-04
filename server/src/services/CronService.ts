/* eslint-disable indent */
import cron from "node-cron";

import { AReaSchema } from "@schemas/area.schema";
import { PopulateOptions } from "mongoose";

import ARea from "../classes/area.class";
import Reaction, { ReactionType } from "../classes/reaction.class";
import Action, { ActionType } from "@classes/action.class";

import { TwitchStreamConfig, UnsplashPostConfig } from "model/ActionConfig";
import { DiscordPostMsgConfig } from "model/ReactionConfig";

import DiscordService from "./DiscordService";
import { TwitchService } from "./twitchService";
import RSSService from "./RSSService";
// import { IsNewPost, DownloadNewPost } from "./unsplashService";
import { DropboxService } from "./DropboxService";
import { unsplashService } from "./unsplashService";
import { TwitterService } from "./twitterService";

export class CronService {

    private _areSchema: AReaSchema = new AReaSchema();
    private _cron;

    constructor(cronTime = "* * * * *") {
        this._cron = cron.schedule(cronTime, this.execute, { scheduled: false });
        this.start();
        this.execute(); // first execution
    }

    public start = () => {
        this._cron.start();
    };

    public stop = () => {
        this._cron.stop();
    };

    public execute = async () => {
        console.log("Running CRON");

        // Fetch action-reactions
        const areas = await this._areSchema.find({}, {
            path: "areas",
            populate: "action reaction" as unknown as PopulateOptions
        });

        areas.forEach((area) => {
            // Process action
            this.executeAction(area);
        });
    };

    private async executeAction(area: ARea) {
        const action = area.trigger.action as Action;

        switch (action.type) {
            case ActionType.DATE:
                // TODO:
                break;
            case ActionType.DATETIME:
                // TODO:
                break;
            case ActionType.TWITCH_STREAM:
                const username = (area.trigger.inputs as TwitchStreamConfig).username;

                if (await TwitchService.IsStreamLive(username))
                    CronService.triggerReaction(area);
                break;
            case ActionType.TWITTER_MSG:
                // TODO:
                break;
            case ActionType.RSS_ENTRY:
                if (await RSSService.evalAction(area))
                    CronService.triggerReaction(area);
                break;
            case ActionType.GITHUB_ISSUE:
                // TODO:
                break;
            case ActionType.GITHUB_PULL_REQ:
                // TODO:
                break;
            case ActionType.DISCORD_MSG:
                // See DiscordService Bot
                break;
            case ActionType.UNSPLASH_POST:
                const config: UnsplashPostConfig = area.trigger.inputs as UnsplashPostConfig;

                if (await unsplashService.DownloadIfNewPost(config.username, config.downloadPath))
                    CronService.triggerReaction(area);

                break;
            default:
                throw "CronService::executeAction: action unsupported.";
        }
    }

    /**
     * Trigger a reaction.
     * @param area ARea
     */
    public static triggerReaction(area: ARea) {
        const reaction: Reaction = area.consequence.reaction as Reaction;
        const action: Action = area.trigger.action as Action;

        switch (reaction.type) {
            case ReactionType.TWITTER_MSG:

                switch (action.type) {
                    case ActionType.UNSPLASH_POST:
                        console.log("action was unsplash post");
                        break;
                    case ActionType.TWITCH_STREAM:
                        console.log("action was twitch stream");
                        break;
                    default:
                        console.log("todo upload file from parameter given");
                }
                // TODO:
                break;
            case ReactionType.TWITTER_BANNER:

                switch (action.type) {
                    case ActionType.UNSPLASH_POST:
                        const configUnsplash: UnsplashPostConfig = area.trigger.inputs as UnsplashPostConfig;

                        TwitterService.UpdateProfileBanner(configUnsplash.downloadPath/* , user */);
                        break;
                    default:
                        console.log("todo upload file from parameter given");
                }
                break;
            case ReactionType.TWITTER_PP:
                switch (action.type) {
                    case ActionType.UNSPLASH_POST:
                        const configUnsplash: UnsplashPostConfig = area.trigger.inputs as UnsplashPostConfig;

                        TwitterService.UpdateProfileImage(configUnsplash.downloadPath/* , user */);
                        break;
                    default:
                        console.log("todo upload file from parameter given");
                }
                break;
            case ReactionType.DISCORD_MSG:
                const input: DiscordPostMsgConfig = area.consequence.inputs as DiscordPostMsgConfig;

                DiscordService.sendMessage(input.channelId, input.message);
                break;
            case ReactionType.GITHUB_ISSUE:
                // TODO:
                break;
            case ReactionType.NOTION_MSG:
                // TODO:
                break;
            case ReactionType.DROPBOX_UPLOAD:
                switch (action.type) {
                    case ActionType.UNSPLASH_POST:
                        const configUnsplash: UnsplashPostConfig = area.trigger.inputs as UnsplashPostConfig;
                        const configDropbox: DropboxUploadConfig = area.consequence.inputs as DropboxUploadConfig;
                        const dropboxFilepath = (configDropbox.filename ? configDropbox.filepath : configUnsplash.downloadPath);

                        DropboxService.uploadFile(configUnsplash.downloadPath, dropboxFilepath);
                        break;
                    default:
                        console.log("todo upload file from parameter given");



                }
                // TODO: if this action the take this param as filepath, else if, else if
                // and get method from this service to return filepath according to area

                break;

            default:
                throw "CronService: triggerReaction reaction not supported";
        }
    }
}