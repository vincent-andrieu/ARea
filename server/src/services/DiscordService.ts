import { ActionType } from "@classes/action.class";
import ARea from "@classes/area.class";
import User from "@classes/user.class";
import { AReaSchema } from "@schemas/area.schema";
import { Client, Message, TextChannel } from "discord.js";
import { discordBotConfig } from "@config/discordConfig";
import { DiscordMessageConfig } from "../models/ActionConfig";
import CronService from "./CronService";
import { UserSchema } from "@schemas/user.schema";

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
    static async sendMessage(channelId: string, message: string): Promise<void> {
        try {
            const channel = await DiscordService.client.channels.fetch(channelId) as TextChannel;

            channel?.send(message);
        } catch (err) {
            console.error("Discord.sendMessage: fail to fetch channel or to send message.");
        }
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