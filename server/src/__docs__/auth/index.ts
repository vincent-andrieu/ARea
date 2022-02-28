import { login } from "./login";
import { register } from "./register";
import { logout } from "./logout";

import { twitchAuth, twitchAuthRedirect } from "./twitch";
import { twitterAuth, twitterAuthRedirect } from "./twitter";
import { unsplashAuth, unsplashAuthRedirect } from "./unsplash";
import { githubAuth, githubAuthRedirect } from "./github";
import { notionAuth, notionAuthRedirect } from "./notion";
import { dropboxAuth, dropboxAuthRedirect } from "./dropbox";
import { linkedinAuth, linkedinAuthRedirect } from "./linkedin";

import { discordRedirect } from "./discord";

import { redirectWeb, redirectMobile } from "./redirect";

export = {
    "/auth/register": register,
    "/auth/login": login,
    "/auth/logout": logout,

    "/auth/twitch": twitchAuth,
    "/auth/twitch/redirect": twitchAuthRedirect,
    "/auth/twitter": twitterAuth,
    "/auth/twitter/redirect": twitterAuthRedirect,
    "/auth/unsplash": unsplashAuth,
    "/auth/unsplash/redirect": unsplashAuthRedirect,
    "/auth/github": githubAuth,
    "/auth/github/redirect": githubAuthRedirect,
    "/auth/notion": notionAuth,
    "/auth/notion/redirect": notionAuthRedirect,
    "/auth/dropbox": dropboxAuth,
    "/auth/dropbox/redirect": dropboxAuthRedirect,
    "/auth/linkedin": linkedinAuth,
    "/auth/linkedin/redirect": linkedinAuthRedirect,

    "/auth/discord": discordRedirect,

    "/auth/redirect/web": redirectWeb,
    "/auth/redirect/mobile": redirectMobile
}