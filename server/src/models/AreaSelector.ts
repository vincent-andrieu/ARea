import { ActionType } from "../classes/action.class";
import { ReactionType } from "../classes/reaction.class";

export interface ActionSelector {
    type: ActionType;
}
export interface ReactionSelector {
    type: ReactionType;
}