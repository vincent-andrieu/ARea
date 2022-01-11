import Schema from "./schema.class";
import Action from "./action.class";
import Reaction from "./reaction.class";

export default class ARea extends Schema {
    action: Action;
    reaction: Reaction;

    constructor(area: ARea) {
        super(area);

        this.action = new Action(area.action);
        this.reaction = new Reaction(area.reaction);
    }
}