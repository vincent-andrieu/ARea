import Model, { ObjectId } from "./model.class";
import ARea from "./area.class";
import OAuthProvider from "./oAuthProvider.enum";

export default class User extends Model {
    username?: string;
    password?: string;
    oauthLoginProvider?: OAuthProvider;
    oauthLoginProviderId?: string;
    token?: string;
    areas?: Array<ARea> | Array<ObjectId> = [];

    constructor(user: User) {
        super(user);

        this.username = user.username || "";
        this.password = user.password || "";
        this.oauthLoginProvider = user.oauthLoginProvider || OAuthProvider.LOCAL;
        this.oauthLoginProviderId = user.oauthLoginProviderId || "";
        this.token = user.token;

        if (user.areas && Array.isArray(user.areas) && user.areas.length > 0)
            if ((user.areas[0] as ARea)._id)
                this.areas = (user.areas as Array<ARea>).map((area) => new ARea(area));
            else
                this.areas = user.areas;
    }
}