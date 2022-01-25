import { Client, Message, TextChannel } from "discord.js";
import { discordBotConfig } from "../config/discordConfig";

const CHANNEL_ID = "535524248262017039"; // DEBUG

export default class DiscordBot {

    static client: Client = new Client;

    static async connect(): Promise<void> {
        await DiscordBot.client.login(discordBotConfig.discord_bot_token);

        DiscordBot.client.on("ready", () => {
            console.log(`Discord bot Logged in as ${DiscordBot.client.user?.tag}!`);
        });
        DiscordBot.client.on("error", console.error);
        DiscordBot.client.on("warn", console.warn);
    }

    static async sendMessage(channelId: string, message: string): Promise<void> {
        const channel: TextChannel =
            await DiscordBot.client.channels.fetch(channelId) as TextChannel;

        channel.send(message);
    }

    static async catchMessages() {
        DiscordBot.client.on("message", (message: Message) => {
            if (message.channel.id == CHANNEL_ID) {
                // TODO TRIGGER ACTION ? (or webhook?)
            }
        });
    }
}