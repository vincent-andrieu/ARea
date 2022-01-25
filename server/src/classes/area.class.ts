import Model, { ObjectId } from "./model.class";
import Action from "./action.class";
import Reaction from "./reaction.class";

export default class ARea extends Model {
    action: Action | ObjectId;
    reaction: Reaction | ObjectId;

    constructor(area: ARea) {
        super(area);

        this.action = (area.action as Action)._id ? new Action(area.action as Action) : area.action;
        this.reaction = (area.reaction as Reaction)._id ? new Reaction(area.reaction as Reaction) : area.reaction;
    }
}