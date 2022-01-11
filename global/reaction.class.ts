import Model from "./model.class";

export default class Reaction extends Model {
    label: string;

    constructor(reaction: Reaction) {
        super(reaction);

        this.label = reaction.label || "";
    }
}