import Model from "./model.class";
import { Parameter } from "./model/Parameters";

export enum ReactionType {
    TWITTER_MSG = "TWITTER_MSG",
    TWITTER_BANNER = "TWITTER_BANNER",
    TWITTER_PP = "TWITTER_PP",
    LINKEDIN_MSG = "LINKEDIN_MSG",
    DISCORD_MSG = "DISCORD_MSG",
    GITHUB_ISSUE = "GITHUB_ISSUE",
    NOTION_MSG = "NOTION_MSG",
    DROPBOX_UPLOAD = "DROPBOX_UPLOAD",
    UNSPLASH = "UNSPLASH"
}

export default class Reaction extends Model {
    type: ReactionType;
    parameters: Array<Parameter>;

    constructor(reaction: Reaction) {
        super(reaction);

        this.type = reaction.type;
        this.parameters = reaction.parameters;
    }
}