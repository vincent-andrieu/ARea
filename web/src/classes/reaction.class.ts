import Model from "./model.class";
import { Parameter } from "./model/Parameters";
import { ServiceType } from "./model/ServiceType";

export enum ReactionType {
    TWITTER_MSG = "TWITTER_MSG",
    TWITTER_BANNER = "TWITTER_BANNER",
    TWITTER_PP = "TWITTER_PP",
    DISCORD_MSG = "DISCORD_MSG",
    GITHUB_ISSUE = "GITHUB_ISSUE",
    GITHUB_PULL = "GITHUB_PULL",
    NOTION_MSG = "NOTION_MSG",
    DROPBOX_UPLOAD = "DROPBOX_UPLOAD"
}

export default class Reaction extends Model {
    type: ReactionType;
    parameters: Array<Parameter>;
    service: ServiceType;

    constructor(reaction: Reaction) {
        super(reaction);

        this.type = reaction.type;
        this.parameters = reaction.parameters;
        this.service = reaction.service;
    }

    public get label(): string {
        switch (this.type) {
        case 'TWITTER_MSG':
            return "Send message";
        case 'TWITTER_BANNER':
            return "Edit banner";
        case 'TWITTER_PP':
            return "Edit PP";
        case 'DISCORD_MSG':
            return "Send message";
        case 'GITHUB_ISSUE':
            return "Add issue";
        case 'GITHUB_PULL':
            return "Add pull request";
        case 'NOTION_MSG':
            return "Add message";
        case 'DROPBOX_UPLOAD':
            return "Upload";

        default: {
            console.error("Unknow reaction type:", this.type);
            return "";
        }
        }
    }
}