import Model, { ObjectId } from "./model.class";
import Action from "./action.class";
import Reaction from "./reaction.class";
import { ActionConfig } from "./model/ActionConfig";
import { ReactionConfig } from "./model/ReactionConfig";

export default class ARea extends Model {
    trigger: {
        inputs: ActionConfig;
        action: Action | ObjectId;
    };
    consequence: {
        inputs: ReactionConfig;
        reaction: Reaction | ObjectId;
    };
    constructor(area: ARea) {
        super(area);

        this.trigger = {
            inputs: area.trigger.inputs,
            action: (area.trigger.action as Action)?._id ? new Action(area.trigger.action as Action) : area.trigger.action
        };
        this.consequence = {
            inputs: area.consequence.inputs,
            reaction: (area.consequence.reaction as Reaction)?._id ? new Reaction(area.consequence.reaction as Reaction) : area.consequence.reaction
        };
    }
}