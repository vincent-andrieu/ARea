import { env } from 'process';
import { ApiClient } from '@twurple/api';
import { ClientCredentialsAuthProvider } from '@twurple/auth';

export async function isStreamLive(userName: string) {

    const clientId = env.TWITCH_CLIENT_ID;
    const clientSecret = env.TWITCH_CLIENT_SECRET;
    if (!clientId || !clientSecret)
        return;

    const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
    const apiClient = new ApiClient({ authProvider });
    const user = await apiClient.users.getUserByName(userName);

    if (!user) {
        return false;
    }
    return await user.getStream() !== null;
}