import { env } from "process";
import { ApiClient } from "@twurple/api";
import { ClientCredentialsAuthProvider } from "@twurple/auth";
import axios from "axios";

export async function isStreamLive(userName: string) {

    const clientId = env.TWITCH_CLIENT_ID;
    const clientSecret = env.TWITCH_CLIENT_SECRET;
    if (!clientId || !clientSecret)
        return;

    const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
    const apiClient = new ApiClient({ authProvider });
    const user = await apiClient.users.getUserByName(userName);

    if (!user)
        return false;
    return await user.getStream() !== null;
}

export async function getAccessToken(code: string) {

    const clientId = env.TWITCH_CLIENT_ID;
    const clientSecret = env.TWITCH_CLIENT_SECRET;
    const redirectUri = env.TWITCH_CALLBACK_URL;
    if (!clientId || !clientSecret || !redirectUri)
        return;

    const url = "https://id.twitch.tv/oauth2/token";
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("code", code);
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", redirectUri);

    console.log(url+params);
    try {
        const response = await axios.post(`${url}?${params}`);
        return response.data;
    } catch (error) {
        console.log("[TWITCH] getAccessToken: ", (error as Error).toString());
        return;
    }
}

export async function getUserProfile(accessToken: string) {

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
        console.log("[TWITCH] getAccessToken: ", (error as Error).toString());
        return;
    }
}