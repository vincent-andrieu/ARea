import Model, { ObjectId } from "./model.class";
import ARea from "./area.class";

export default class User extends Model {
    username: string;
    password?: string;
    token?: string;
    areas?: Array<ARea> | Array<ObjectId> = [];

    constructor(user: User) {
        super(user);

        this.username = user.username || "";
        this.password = user.password || "";

        if (user.areas && Array.isArray(user.areas) && user.areas.length > 0)
            if ((user.areas[0] as ARea)._id)
                this.areas = user.areas.map((area) => new ARea(area));
            else
                this.areas = user.areas;
    }
}