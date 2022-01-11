import Schema from "./schema.class";

export default class Action extends Schema {
    label: string;
    cron: boolean;

    constructor(action: Action) {
        super(action);

        this.label = action.label || "";
        this.cron = !!action.cron;
    }
}