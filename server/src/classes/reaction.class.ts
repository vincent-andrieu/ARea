import Model from "./model.class";

export enum ReactionType {
    TWITTER_MSG = "TWITTER_MSG",
    LINKEDIN_MSG = "LINKEDIN_MSG",
    TWITTER_PP = "TWITTER_PP",
    DISCORD_MSG = "DISCORD_MSG",
    GITHUB_ISSUE = "GITHUB_ISSUE",
    NOTION_MSG = "NOTION_MSG",
    ONEDRIVE_UPLOAD = "ONEDRIVE_UPLOAD",
}

export default class Reaction extends Model {
    label: string;
    type: ReactionType;

    constructor(reaction: Reaction) {
        super(reaction);

        this.type = reaction.type;
        this.label = reaction.label || "";
    }
}