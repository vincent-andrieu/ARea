import Model from "./model.class";
import { Parameter } from "./model/Parameters";
import { ServiceType } from "./model/ServiceType";

export enum ActionType {
    CRON = "CRON",
    DATETIME = "DATETIME",
    TWITCH_STREAM = "TWITCH_STREAM",
    TWITTER_MSG = "TWITTER_MSG",
    RSS_ENTRY = "RSS_ENTRY",
    GITHUB_ISSUE = "GITHUB_ISSUE",
    GITHUB_PULL_REQ = "GITHUB_PULL_REQ",
    DISCORD_MSG = "DISCORD_MSG",
    UNSPLASH_POST = "UNSPLASH_POST",
    UNSPLASH_RANDOM_POST = "UNSPLASH_RANDOM_POST"
}

export default class Action extends Model {
    type: ActionType;
    parameters: Array<Parameter>;
    service: ServiceType;

    constructor(action: Action) {
        super(action);

        this.type = action.type;
        this.parameters = action.parameters;
        this.service = action.service;
    }

    public get label(): string {
        switch (this.type) {
        case 'DATETIME':
            return "Date";
        case 'CRON':
            return "CRON";
        case 'DISCORD_MSG':
            return "Send message";
        case 'GITHUB_ISSUE':
            return "GitHub issue";
        case 'GITHUB_PULL_REQ':
            return "Pull request";
        case 'RSS_ENTRY':
            return "RSS";
        case 'TWITCH_STREAM':
            return "Stream start";
        case 'TWITTER_MSG':
            return "On message";
        case 'UNSPLASH_POST':
            return "Post";
        case 'UNSPLASH_RANDOM_POST':
            return "Post a random post";

        default: {
            console.error("Unknow action type:", this.type);
            return "";
        }
        }
    }
}