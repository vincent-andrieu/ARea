import Schema from "./schema.class";

export default class Reaction extends Schema {
    label: string;

    constructor(reaction: Reaction) {
        super(reaction);

        this.label = reaction.label || "";
    }
}