import { env } from "process";
import { ApiClient } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";

export class TwitchService {
    private static getClient(): ApiClient {
        const clientId = env.TWITCH_CLIENT_ID;
        const clientSecret = env.TWITCH_CLIENT_SECRET;
        if (!clientId || !clientSecret)
            throw new Error("Invalid Twitch credentials");

        const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
        return new ApiClient({ authProvider });
    }

    public static async IsStreamLive(userName: string) {
        const client = TwitchService.getClient();
        const user = await client.users.getUserByName(userName);

        if (!user)
            return false;
        return await user.getStream() !== null;
        // TODO: set stream infos to variable that is wether returned or passed as pointer param
    }
}