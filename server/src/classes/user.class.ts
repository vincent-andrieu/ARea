import Model, { ObjectId } from "./model.class";
import ARea from "./area.class";

export interface IRawUser {
    username: string;
    token?: string;
    areas?: Array<ARea> | Array<ObjectId>;
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
}

export default class User extends Model {
    username: string;
    password?: string;
    token?: string;
    areas?: Array<ARea> | Array<ObjectId> = [];
    oauth?: {
        twitter?: {
            id: string;
            accessToken: string;
            secretToken: string;
        },
        github?: {
            id: string;
            accessToken: string;
            refreshToken: string;
        },
        discord?: never,
        dropbox?: {
            id: string;
            accessToken: string;
            refreshToken: string;
        },
        notion?: {
            id: string;
            accessToken: string;
        },
        twitch?: {
            id: string;
            accessToken: string;
            refreshToken: string;
        },
        linkedin?: {
            id: string;
            accessToken: string;
            refreshToken: string;
        },
        unsplash?: {
            id: string;
            accessToken: string;
            refreshToken: string;
        }
    };

    constructor(user: Omit<User, "toRaw">) {
        super(user);

        this.username = user.username || "";
        this.password = user.password;
        this.token = user.token;
        this.oauth = {};
        if (user.oauth) {
            if (user.oauth.twitter)
                this.oauth.twitter = {
                    id: user.oauth.twitter.id,
                    accessToken: user.oauth.twitter.accessToken,
                    secretToken: user.oauth.twitter.secretToken
                };
            if (user.oauth.github)
                this.oauth.github = {
                    id: user.oauth.github.id,
                    accessToken: user.oauth.github.accessToken,
                    refreshToken: user.oauth.github.refreshToken
                };
            if (user.oauth.dropbox)
                this.oauth.dropbox = {
                    id: user.oauth.dropbox.id,
                    accessToken: user.oauth.dropbox.accessToken,
                    refreshToken: user.oauth.dropbox.refreshToken
                };
            if (user.oauth.notion)
                this.oauth.notion = {
                    id: user.oauth.notion.id,
                    accessToken: user.oauth.notion.accessToken
                };
            if (user.oauth.twitch)
                this.oauth.twitch = {
                    id: user.oauth.twitch.id,
                    accessToken: user.oauth.twitch.accessToken,
                    refreshToken: user.oauth.twitch.refreshToken
                };
            if (user.oauth.linkedin)
                this.oauth.linkedin = {
                    id: user.oauth.linkedin.id,
                    accessToken: user.oauth.linkedin.accessToken,
                    refreshToken: user.oauth.linkedin.refreshToken
                };
            if (user.oauth.unsplash)
                this.oauth.unsplash = {
                    id: user.oauth.unsplash.id,
                    accessToken: user.oauth.unsplash.accessToken,
                    refreshToken: user.oauth.unsplash.refreshToken
                };
        }
        if (user.areas && Array.isArray(user.areas) && user.areas.length > 0)
            try {
                if ((user.areas[0] as ARea).trigger.action != undefined)
                    this.areas = (user.areas as Array<ARea>).map((area) => new ARea(area));
                else
                    this.areas = user.areas;

            } catch (e) {
                this.areas = user.areas;
            }
    }

    public toRaw(): IRawUser {
        return {
            username: this.username,
            token: this.token,
            areas: this.areas,
            oauth: {
                twitter: !!this.oauth?.twitter,
                github: !!this.oauth?.github,
                discord: !!this.oauth?.discord,
                dropbox: !!this.oauth?.dropbox,
                notion: !!this.oauth?.notion,
                twitch: !!this.oauth?.twitch,
                linkedin: !!this.oauth?.linkedin,
                unsplash: !!this.oauth?.unsplash
            }
        };
    }
}