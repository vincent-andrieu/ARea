import Model from "./model.class";

export default class Action extends Model {
    label: string;

    constructor(action: Action) {
        super(action);

        this.label = action.label || "";
    }
}