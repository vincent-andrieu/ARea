import { ActionType } from "@classes/action.class";
import ARea from "@classes/area.class";
import { AReaSchema } from "@schemas/area.schema";
import { Client, Message, TextChannel } from "discord.js";
import { discordBotConfig } from "../config/discordConfig";
import { DiscordMessageConfig } from "../model/ActionConfig";

const CHANNEL_ID = "535524248262017039"; // DEBUG

interface ChannelListenerItem {
    channelId: string,
    areaId: string
}

export default class DiscordBot {

    static client: Client = new Client;
    static channelListenerList: ChannelListenerItem[] = [];
    static areaSchema: AReaSchema = new AReaSchema;

    static async connect(): Promise<void> {
        await DiscordBot.client.login(discordBotConfig.discord_bot_token);

        DiscordBot.client.on("ready", async () => {
            console.log(`DiscordBot: Discord bot Logged in as ${DiscordBot.client.user?.tag}!`);
        });
        DiscordBot.client.on("error", console.error);
        DiscordBot.client.on("warn", console.warn);

        await this.refreshListenerList(); // load list
        this.catchMessages();
    }

    static async refreshListenerList() {
        const list: ARea[] = await this.areaSchema.fetchByAction(ActionType.DISCORD_MSG);

        list.forEach((value: ARea) => {
            try {
                const inputs = value.trigger.inputs as DiscordMessageConfig;

                if (value._id && inputs.channelId != undefined)
                    DiscordBot.channelListenerList.push({ channelId: inputs.channelId, areaId: value._id.toString() });
                else
                    console.warn("DiscordBot refreshListenerList: in action, missing parameter channelId");
            } catch (err) {
                console.error(`DiscordBot refreshListenerList: ${err}`);
            }
        });
    }

    static async sendMessage(channelId: string, message: string): Promise<void> {
        const channel = await DiscordBot.client.channels.fetch(channelId) as TextChannel;

        channel?.send(message);
    }

    private static async catchMessages() {

        DiscordBot.client.on("message", async (message: Message) => {
            try {
                const result = DiscordBot.channelListenerList.find((item) => {
                    return item.channelId === message.channel.id;
                });
                if (result != undefined) {
                    // fetch action
                    const area: ARea = await this.areaSchema.get(result.areaId);


                    // TODO: TRIGGER ACTION : area.reaction
                    this.sendMessage(message.channel.id, "Infinite loop"); // DEBUG
                }
            } catch (err) {
                console.error(`DiscordBot catchMessages: ${err}`);
                // TODO: remove the channel listener from the list ?
            }
        });
    }

    // static async createWebhook() {
    //     this.channel?.createWebhook("AREA webhook")
    //         .then((webhook: Webhook) => {
    //             console.log(`DiscordBot: Webhook created ${webhook}`);
    //         })
    //         .catch(console.error);
    // }

    // static async fetchWebhook(): Promise<boolean> {
    //     try {
    //         if (this.channel === null) {
    //             console.error("DiscordBot fetchWebhook: channel not found.");
    //             return false;
    //         }
    //         const webhooks = await this.channel.fetchWebhooks();
    //         this.webhook = webhooks.find(wh => wh.token !== null);

    //         if (!this.webhook) {
    //             console.log("DiscordBot fetchWebhook: No webhook was found that I can use!");
    //             return false;
    //         }
    //         return true;
    //     } catch (err) {
    //         console.error(`DiscordBot fetchWebhook: ${err}`);
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