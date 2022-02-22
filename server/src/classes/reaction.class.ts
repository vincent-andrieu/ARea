import Model from "./model.class";
import { Parameter } from "../models/Parameters";
import { ServiceType } from "../models/ServiceType";

export enum ReactionType {
    TWITTER_MSG = "TWITTER_MSG",
    TWITTER_BANNER = "TWITTER_BANNER",
    TWITTER_PP = "TWITTER_PP",
    LINKEDIN_MSG = "LINKEDIN_MSG",
    DISCORD_MSG = "DISCORD_MSG",
    GITHUB_ISSUE = "GITHUB_ISSUE",
    GITHUB_PULL = "GITHUB_PULL",
    NOTION_MSG = "NOTION_MSG",
    DROPBOX_UPLOAD = "DROPBOX_UPLOAD"
}

export default class Reaction extends Model {
    type: ReactionType;
    parameters: Parameter[];
    service: ServiceType;

    constructor(reaction: Reaction) {
        super(reaction);

        this.type = reaction.type;
        this.parameters = reaction.parameters;
        this.service = reaction.service;
    }
}