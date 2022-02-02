import cron from "node-cron";
import Reaction, { ReactionType } from "../classes/reaction.class";
import ARea from "../classes/area.class";
import DiscordService from "./DiscordService";
import { DiscordPostMsgConfig } from "model/ReactionConfig";
import { PopulateOptions } from "mongoose";
import { AReaSchema } from "@schemas/area.schema";
import Action, { ActionType } from "@classes/action.class";
import { isStreamLive } from "./twitchService";
import { TwitchStreamConfig } from "model/ActionConfig";
import RSSService from "./RSSService";

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

    public execute = () => {
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

    private executeAction(area: ARea) {
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
                if (await isStreamLive(username)) {
                    CronService.triggerReaction(area);
                }
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

        switch (reaction.type) {
            case ReactionType.LINKEDIN_MSG:
                // ?
                break;
            case ReactionType.TWITTER_MSG:
                // TODO:
                break;
            case ReactionType.TWITTER_MSG:
                // TODO:
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
            case ReactionType.ONEDRIVE_UPLOAD:
                // TODO:
                break;
            case ReactionType.UNSPLASH:
                // TODO:
                break;
            default:
                throw "CronService: triggerReaction reaction not supported";
        }
    }