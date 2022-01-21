import Model from "./model.class";
import ARea from "./area.class";
import OAuthProvider from "../model/oAuthProvider.enum";

export default class User extends Model {
    username?: string;
    password?: string;
    oauthLoginProvider?: OAuthProvider;
    oauthLoginProviderId?: string;//
    token?: string;
    areas?: Array<ARea> = [];

    constructor(user: User) {
        super(user);

        this.username = user.username || "";
        this.password = user.password || "";
        this.oauthLoginProvider = user.oauthLoginProvider || OAuthProvider.LOCAL;
        this.oauthLoginProviderId = user.oauthLoginProviderId || "";

        if (user.areas && Array.isArray(user.areas))
            this.areas = user.areas.map((area) => new ARea(area));
    }
}