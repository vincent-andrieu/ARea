import { env } from "process";
import { ApiClient, HelixStream } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import ARea from "../classes/area.class";
import { TwitchStreamResult } from "models/ActionResult";
import axios from "axios";
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
            await this.areaSetStreamInfos(area, stream);
            if (area.trigger.outputs && (area.trigger.outputs as TwitchStreamResult).StreamGame) {
                console.log("Stream already launch.");
                return false;
            }
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error.toString());
            return false;
        }
        return true;
    }

    public static async getAccessToken(code: string) {

        const clientId = env.TWITCH_CLIENT_ID;
        const clientSecret = env.TWITCH_CLIENT_SECRET;
        const redirectUri = env.TWITCH_CALLBACK_MOBILE;
        if (!clientId || !clientSecret || !redirectUri)
            return;

        const url = "https://id.twitch.tv/oauth2/token";
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("client_secret", clientSecret);
        params.append("code", code);
        params.append("grant_type", "authorization_code");
        params.append("redirect_uri", redirectUri);

        try {
            const response = await axios.post(`${url}?${params}`);
            return response.data;
        } catch (error) {
            console.log("[TWITCH] getAccessToken: ", (error as Error).toString());
            return;
        }
    }

    public static async getUserProfile(accessToken: string) {

        const clientId = env.TWITCH_CLIENT_ID;
        if (!clientId)
            return;

        try {
            const res = await axios.get("https://api.twitch.tv/helix/users", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Client-Id": clientId
                }
            });
            return {
                ...res.data.data[0],
                provider: "twitch"
            };
        } catch (error) {
            console.log("[TWITCH] getUserProfile: ", (error as Error).toString());
            return;
        }
    }
}