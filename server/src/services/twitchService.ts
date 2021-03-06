import { env } from "process";
import { ApiClient, HelixStream } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import ARea from "../classes/area.class";
import { TwitchStreamResult } from "models/ActionResult";
import { AReaSchema } from "@schemas/area.schema";

export class TwitchService {

    private static _areaSchema = new AReaSchema();

    private static getClient(): ApiClient {
        const clientId = env.TWITCH_CLIENT_ID;
        const clientSecret = env.TWITCH_CLIENT_SECRET;
        if (!clientId || !clientSecret)
            throw new Error("Invalid Twitch credentials");

        const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
        return new ApiClient({ authProvider });
    }

    private static async areaSetStreamInfos(area: ARea, stream: HelixStream) {
        const result: TwitchStreamResult = area.trigger.outputs as TwitchStreamResult || {};

        result.StreamGame = stream.gameName;
        result.StreamTitle = stream.title;
        result.Username = stream.userDisplayName;
        result.StreamLanguage = stream.language;
        result.StreamThumbnailUrl = stream.thumbnailUrl;
        result.StreamThumbnailUrl = result.StreamThumbnailUrl.replace("{width}", "1920");
        result.StreamThumbnailUrl = result.StreamThumbnailUrl.replace("{height}", "1080");
        result.StreamViewers = stream.viewers;
        area.trigger.outputs = result;
        await TwitchService._areaSchema.edit(area);
    }

    public static async IsStreamLive(area: ARea, userName: string): Promise<boolean> {
        try {
            const client = TwitchService.getClient();
            const user = await client.users.getUserByName(userName);

            if (!user)
                return false;
            const stream = await user.getStream();
            if (stream === null) {
                delete area.trigger.outputs;
                await TwitchService._areaSchema.edit(area);
                return false;
            }
            if (area.trigger.outputs && (area.trigger.outputs as TwitchStreamResult).StreamGame) {
                await this.areaSetStreamInfos(area, stream);
                return false;
            }
            await this.areaSetStreamInfos(area, stream);
        } catch (error) {
            const some_error = error as Error;

            console.error(some_error);
            return false;
        }
        return true;
    }
}