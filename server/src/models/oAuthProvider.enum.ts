import { Profile as PassportProfile } from "passport";

enum OAuthProvider {
    LOCAL = "local",
    TWITTER = "twitter",
    TWITCH = "twitch",
    GITHUB = "github",
    NOTION = "notion",
    LINKEDIN = "linkedin",
    DISCORD = "discord",
    UNSPLASH = "unsplash",
    DROPBOX = "dropbox"
}

export default OAuthProvider;


declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    interface Profile extends PassportProfile {
        [key: string]: any;
    }
}