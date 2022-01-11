import Model from "./model.class";

export default class Action extends Model {
    label: string;
    cron: boolean;

    constructor(action: Action) {
        super(action);

        this.label = action.label || "";
        this.cron = !!action.cron;
    }
}