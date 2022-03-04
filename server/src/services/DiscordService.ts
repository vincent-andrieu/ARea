import Action, { ActionType } from "@classes/action.class";
import ARea from "@classes/area.class";
import User from "@classes/user.class";
import { AReaSchema } from "@schemas/area.schema";
import { Client, Message, TextChannel } from "discord.js";
import { discordBotConfig } from "@config/discordConfig";
import { DiscordMessageConfig } from "../models/ActionConfig";
import { DiscordPostMsgConfig } from "models/ReactionConfig";
import CronService from "./CronService";
import { UserSchema } from "@schemas/user.schema";
import { DiscordMessageResult, GithubResult, RSSResult, TwitchStreamResult, TwitterTweetResult, UnsplashPostResult } from "@models/ActionResult";
import moment from "moment";

interface ChannelListenerItem {
    channelId: string,
    areaId: string
}

export default class DiscordService {

    static client: Client = new Client;
    static channelListenerList: ChannelListenerItem[] = [];
    static areaSchema: AReaSchema = new AReaSchema;
    static userSchema: UserSchema = new UserSchema;

    static async connect(): Promise<void> {
        await DiscordService.client.login(discordBotConfig.discord_bot_token);

        DiscordService.client.on("ready", async () => {
            console.log(`DiscordService: Discord bot Logged in as ${DiscordService.client.user?.tag}!`);
        });
        DiscordService.client.on("error", console.error);
        DiscordService.client.on("warn", console.warn);

        await this.refreshListenerList(); // load list
        this.catchMessages();
    }

    /**
     * Call this method when actions are added/modified in the database.
     */
    static async refreshListenerList() {
        const list: ARea[] = await this.areaSchema.fetchByAction(ActionType.DISCORD_MSG);

        DiscordService.channelListenerList = [];
        list.forEach((value: ARea) => {
            try {
                const inputs = value.trigger.inputs as DiscordMessageConfig;

                if (value._id && inputs.channelId != undefined)
                    DiscordService.channelListenerList.push({ channelId: inputs.channelId, areaId: value._id.toString() });
                else
                    console.warn("DiscordService refreshListenerList: in action, missing parameter channelId");
            } catch (err) {
                console.error(`DiscordService refreshListenerList: ${err}`);
            }
        });
    }

    /**
     * Reaction : send a message to the target channel
     * @param channelId string
     * @param message string
     */
    private static async sendMessage(channelId: string, message: string): Promise<void> {
        try {
            const channel = await DiscordService.client.channels.fetch(channelId) as TextChannel;

            channel?.send(message);
        } catch (err) {
            console.error("Discord.sendMessage: fail to fetch channel or to send message.");
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
        line += "Link to the post : " + unsplash.link + "\n";
        line += "description : " + unsplash.description + "\n";
        line += "Actual number of likes : " + unsplash.likes + "\n";
        line += "Creation time : " + time + "\n";
        return line;
    }

    public static async rea_Message(area: ARea, user: User) {
        const action: Action = area.trigger.action as Action;
        const config = area.consequence.inputs as DiscordPostMsgConfig;
        let line: string = config.message + "\n";

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
            line += "";
        }
        this.sendMessage(config.channelId, line);
    }

    /**
     * Action worker : detect new messages
     */
    private static async catchMessages() {

        DiscordService.client.on("message", async (message: Message) => {
            try {
                const result = DiscordService.channelListenerList.find((item) => {
                    return item.channelId === message.channel.id;
                });
                if (result != undefined) {
                    // fetch action-reaction
                    const area: ARea = await this.areaSchema.getPopulate(result.areaId);
                    area.trigger.outputs = {
                        channelId: message.channel.id,
                        message: message.content
                    };

                    const user: User = await this.userSchema.getUserByAReaId(area);
                    // TRIGGER REACTION
                    CronService.triggerReaction(area, user);
                }
            } catch (err) {
                console.error(`DiscordService catchMessages: ${err}`);
            }
        });
    }

    // static async createWebhook() {
    //     this.channel?.createWebhook("AREA webhook")
    //         .then((webhook: Webhook) => {
    //             console.log(`DiscordService: Webhook created ${webhook}`);
    //         })
    //         .catch(console.error);
    // }

    // static async fetchWebhook(): Promise<boolean> {
    //     try {
    //         if (this.channel === null) {
    //             console.error("DiscordService fetchWebhook: channel not found.");
    //             return false;
    //         }
    //         const webhooks = await this.channel.fetchWebhooks();
    //         this.webhook = webhooks.find(wh => wh.token !== null);

    //         if (!this.webhook) {
    //             console.log("DiscordService fetchWebhook: No webhook was found that I can use!");
    //             return false;
    //         }
    //         return true;
    //     } catch (err) {
    //         console.error(`DiscordService fetchWebhook: ${err}`);
    //         return false;
    //     }
    // }

    // static async sendMessageViaWebhook() {
    //     await this.webhook?.send("Webhook test", {
    //         username: "some-username",
    //         avatarURL: "https://i.imgur.com/AfFp7pu.png"
    //     });
    //     console.log("message sent");
    // }
}