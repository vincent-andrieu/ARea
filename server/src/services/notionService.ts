/* eslint-disable indent */
import Action, { ActionType } from "@classes/action.class";
import ARea from "@classes/area.class";
import User from "@classes/user.class";
import { DiscordMessageResult, GithubResult, RSSResult, TwitchStreamResult, TwitterTweetResult, UnsplashPostResult } from "@models/ActionResult";

import { NotionAddMessageConfig } from "@models/ReactionConfig";
import moment from "moment";
import { Client } from "@notionhq/client";

const notionBlockIdRexexp = /([a-z0-9]+)$/;

export default class NotionService {

    private static getBlockIdFromPageUrl(pageUrl: string): string | null {
        const resultRegexp = notionBlockIdRexexp.exec(pageUrl);
        if (!resultRegexp || !resultRegexp[0])
            return null;

        return resultRegexp[0];
    }

    private static async appendBlockToPage(accessToken: string, urlPage: string, line: string) {

        try {
            const blockId: string | null = NotionService.getBlockIdFromPageUrl(urlPage);
            if (!blockId)
                return;
            const notion = new Client({ auth: accessToken });
            /* const response =  */await notion.blocks.children.append({
                block_id: blockId,
                children: [{ paragraph: { text: [{ text: { content: line } }] } }]
            });

        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    private static rea_githubLine(area: ARea, type: string): string {
        const github: GithubResult = area.trigger.outputs as GithubResult;
        const time = moment(github.created_at).format("DD/MM/YYYY HH:mm");
        let line = "";

        line += "New github " + type + " on repo : " + github.repository + " owned by " + github.owner + "\n";
        line += "Title : " + github.title + "\n";
        line += "Body : " + github.body + "\n";
        line += "State : " + github.state + "\n";
        line += "Number : " + github.number + "\n";
        line += "Labels : " + github.labels + "\n";
        line += "Creation time : " + time + "\n";
        line += "ID : " + github.id + "\n";
        line += "Locked ? : " + github.locked + "\n";
        line += "Url : " + github.url + "\n";
        return line;
    }

    private static rea_discordLine(area: ARea): string {
        const discord: DiscordMessageResult = area.trigger.outputs as DiscordMessageResult;

        return "New discord message (channel : " + discord.channelId + ") : " + discord.message;
    }

    private static rea_RSSLine(area: ARea): string {
        const RSS: RSSResult = area.trigger.outputs as RSSResult;

        return "New RSS at : " + RSS.url;
    }

    private static rea_twitterLine(area: ARea): string {
        const twitter: TwitterTweetResult = area.trigger.outputs as TwitterTweetResult;
        const time = moment(twitter.created_at).format("DD/MM/YYYY HH:mm");
        let line = "";

        line += "New tweet by : " + twitter.username + "\n";
        line += "Content : " + twitter.text + "\n";
        line += twitter.coordinates === undefined ? "" : "Coordinates : " + twitter.coordinates + "\n";
        line += "Creation time : " + time + "\n";
        line += "language : " + twitter.lang + "\n";
        line += "Actual number of likes : " + twitter.like_count + "\n";
        line += "Actual number of quotes : " + twitter.quote_count + "\n";
        line += "Actual number of replies : " + twitter.reply_count + "\n";
        line += "Actual number of retweets : " + twitter.retweet_count + "\n";
        return line;

    }

    private static rea_twitchLine(area: ARea): string {
        const twitch: TwitchStreamResult = area.trigger.outputs as TwitchStreamResult;
        let line = "";

        line += "New Twitch stream by : " + twitch.Username + "\n";
        line += "Name : " + twitch.StreamTitle + "\n";
        line += "Game : " + twitch.StreamGame + "\n";
        line += "Actual number of viewers : " + twitch.StreamViewers + "\n";
        line += "Language : " + twitch.StreamLanguage + "\n";
        return line;
    }

    private static rea_unsplashLine(area: ARea): string {
        const unsplash: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult;
        const time = moment(unsplash.created_at).format("DD/MM/YYYY HH:mm");
        let line = "";

        line += "New unsplash post by : " + unsplash.name + " " + unsplash.lastname + "\n";
        line += "description : " + unsplash.description + "\n";
        line += "Actual number of likes : " + unsplash.likes + "\n";
        line += "Creation time : " + time + "\n";
        return line;
    }

    public static async rea_appendTextToPage(area: ARea, user: User) {
        const action: Action = area.trigger.action as Action;
        const config = area.consequence.inputs as NotionAddMessageConfig;
        let line: string = config.message + "\n";

        if (!user || !user.oauth || !user.oauth || !user.oauth.notion || !user.oauth.notion.accessToken)
            return;
        switch (action.type) {
            case ActionType.TWITTER_MSG:
                line += this.rea_twitterLine(area);
                break;
            case ActionType.GITHUB_ISSUE:
                line += this.rea_githubLine(area, "issue");
                break;
            case ActionType.GITHUB_PULL_REQ:
                line += this.rea_githubLine(area, "pull request");
                break;
            case ActionType.DISCORD_MSG:
                line += this.rea_discordLine(area);
                break;
            case ActionType.RSS_ENTRY:
                line += this.rea_RSSLine(area);
                break;
            case ActionType.TWITCH_STREAM:
                line += this.rea_twitchLine(area);
                break;
            case ActionType.UNSPLASH_POST:
                line += this.rea_unsplashLine(area);
                break;
            case ActionType.UNSPLASH_RANDOM_POST:
                line += this.rea_unsplashLine(area);
                break;
            default:
                console.log("doing nothing as default notion reaction");
        }
        this.appendBlockToPage(user.oauth.notion.accessToken, config.urlPage, line);
    }

}