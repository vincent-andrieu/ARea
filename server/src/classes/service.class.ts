import Model, { ObjectId } from "./model.class";
import Action from "./action.class";
import Reaction from "./reaction.class";

export default class Service extends Model {
    label: string;
    actions: Array<Action> | Array<ObjectId> = [];
    reactions: Array<Reaction> | Array<ObjectId> = [];

    constructor(service: Service) {
        super(service);

        this.label = service.label || "";

        if (Array.isArray(service.actions) && service.actions.length > 0)
            if ((service.actions[0] as Action)._id)
                this.actions = service.actions.map((action) => new Action(action));
            else
                this.actions = service.actions;
        if (Array.isArray(service.reactions) && service.reactions.length > 0)
            if ((service.reactions[0] as Reaction)._id)
                this.reactions = service.reactions.map((reaction) => new Reaction(reaction));
            else
                this.reactions = service.reactions;
    }
}