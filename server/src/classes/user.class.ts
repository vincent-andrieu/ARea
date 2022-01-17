import Model from "./model.class";
import ARea from "./area.class";

export default class User extends Model {
    username: string;
    password?: string;
    token?: string;
    areas?: Array<ARea> = [];

    constructor(user: User) {
        super(user);

        this.username = user.username || "";
        this.password = user.password || "";

        if (user.areas && Array.isArray(user.areas))
            this.areas = user.areas.map((area) => new ARea(area));
    }
}