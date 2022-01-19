import Model from "./model.class";
import Action from "./action.class";
import Reaction from "./reaction.class";

export default class ARea extends Model {
    action: Action;
    reaction: Reaction;

    constructor(area: ARea) {
        super(area);

        this.action = area.action;
        this.reaction = area.reaction;
    }
}