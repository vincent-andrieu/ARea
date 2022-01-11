import Schema from "./schema.class";
import Action from "./action.class";
import Reaction from "./reaction.class";

export default class Service extends Schema {
    label: string;
    actions: Array<Action> = [];
    reactions: Array<Reaction> = [];

    constructor(service: Service) {
        super(service);

        this.label = service.label || "";

        if (Array.isArray(service.actions))
            this.actions = service.actions.map((action) => new Action(action));
        if (Array.isArray(service.reactions))
            this.reactions = service.reactions.map((reaction) => new Reaction(reaction));
    }
}