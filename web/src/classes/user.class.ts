import Model, { ObjectId } from "./model.class";
import ARea from "./area.class";

export default class User extends Model {
    username: string;
    token?: string;
    areas?: Array<ARea> | Array<ObjectId> = [];
    oauth?: {
        twitter: boolean,
        github: boolean,
        discord: boolean
        dropbox: boolean,
        notion: boolean,
        twitch: boolean,
        linkedin: boolean,
        unsplash: boolean
    };

    constructor(user: User) {
        super(user);

        this.username = user.username || "";
        this.token = user.token;

        if (user.areas && Array.isArray(user.areas) && user.areas.length > 0)
            if ((user.areas[0] as ARea)._id)
                this.areas = (user.areas as Array<ARea>).map((area) => new ARea(area));
            else
                this.areas = user.areas;

        this.oauth = {
            twitter: !!user.oauth?.twitter,
            github: !!user.oauth?.github,
            discord: !!user.oauth?.discord,
            dropbox: !!user.oauth?.dropbox,
            notion: !!user.oauth?.notion,
            twitch: !!user.oauth?.twitch,
            linkedin: !!user.oauth?.linkedin,
            unsplash: !!user.oauth?.unsplash
        };
    }
}