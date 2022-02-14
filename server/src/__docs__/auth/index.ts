import { login } from "./login";
import { register } from "./register";
import { logout } from "./logout";
import { twitchRedirectMobile } from "./twitchRedirectMobile";
import { unsplashRedirectMobile } from "./unsplashRedirectMobile";
import { twitterRedirectMobile } from "./twitterRedirectMobile";

export = {
    "/auth/register": {
        ...register
    },
    "/auth/login": {
        ...login
    },
    "/auth/logout": {
        ...logout
    },
    "/auth/twitch/redirect/mobile": {
        ...twitchRedirectMobile
    },
    "/auth/twitter/redirect/mobile": {
        ...twitterRedirectMobile
    },
    "/auth/unsplash/redirect/mobile": {
        ...unsplashRedirectMobile
    }
}