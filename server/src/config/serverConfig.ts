import { env } from "process";

const SERVER_PORT = env.SERVER_PORT || 8080;
const COOKIE_KEY = env.COOKIE_KEY || "";
const JWT_SECRET = env.JWT_SECRET;

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}

export const serverConfig = {
    port: SERVER_PORT,
    cookieKey: COOKIE_KEY,
    database: {
        host: env.DB_HOST || "127.0.0.1",
        port: env.DB_PORT || 27017,
        name: env.DB_NAME,
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD
    },
    jwtSecret: JWT_SECRET
};

export const servicesList = {
    services: [
        {
            name: "cron",
            actions: [{
                name: "DATE",
                description: "The action is trigger each period"
            }, {
                name: "DATETIME",
                description: "It's the date specified by the user"
            }],
            reactions: []
        },
        {
            name: "twitch",
            actions: [{
                name: "TWITCH_STREAM",
                description: "A new twitch stream starts"
            }],
            reactions: []
        },
        {
            name: "unsplash",
            actions: [{
                name: "UNSPLASH_POST",
                description: "A new image is posted on unsplash"
            }],
            reactions: []
        },
        {
            name: "twitter",
            actions: [{
                name: "TWITTER_MSG",
                description: "A new tweet is posted on twitter"
            }],
            reactions: [{
                name: "TWITTER_MSG",
                description: "Post a new tweet"
            }, {
                name: "TWITTER_PP",
                description: "Change your profile picture on twitter"
            }]
        },
        {
            name: "rss",
            actions: [{
                name: "RSS_ENTRY",
                description: "A new article is posted in rss flux"
            }],
            reactions: []
        },
        {
            name: "discord",
            actions: [{
                name: "DISCORD_MSG",
                description: "A new message is posted on a discord channel"
            }],
            reactions: [{
                name: "DISCORD_MSG",
                description: "Post a message on a discord channel"
            }]
        },
        {
            name: "github",
            actions: [{
                name: "GITHUB_ISSUE",
                description: "A new github issue is created on a repository"
            }, {
                name: "GITHUB_PULL_REQ",
                description: "A new github pull request is created on a repository"
            }],
            reactions: [{
                name: "GITHUB_ISSUE",
                description: "Create a new github issue on a repository"
            }]
        },
        {
            name: "notion",
            actions: [],
            reactions: [{
                name: "NOTION_MSG",
                description: "Append a text on a notion page"
            }]
        },
        {
            name: "dropbox",
            actions: [],
            reactions: [{
                name: "DROPBOX_UPLOAD",
                description: "Upload a text file on dropbox"
            }]
        }
    ]
};