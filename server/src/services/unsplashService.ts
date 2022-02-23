import { env } from "process";

import nodeFetch from "node-fetch";
import { createApi } from "unsplash-js";
import { Full, Random } from "unsplash-js/dist/methods/photos/types";

import ARea from "@classes/area.class";
import { UnsplashPostResult } from "@models/ActionResult";
import { utils } from "./utils";
import { unsplashConfig } from "@config/unsplashConfig";
import axios from "axios";
import { AReaSchema } from "@schemas/area.schema";

export default class unsplashService {

    static lastPostId: string | undefined;
    private static _areaSchema = new AReaSchema();

    private static IsNewPost(area: ARea, postId: string): boolean {
        const last: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult;

        if (!last)
            return false;
        if (last.lastPostId == postId)
            return false;
        return true;
    }

    private static async setDownloadInfos(area: ARea, downloadPath: string, post: Full | Random) {
        const result: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult || {};

        result.downloadPath = downloadPath;
        result.lastPostId = post.id;
        result.created_at = post.created_at;
        result.name = post.user.first_name;
        if (post.user.last_name)
            result.lastname = post.user.last_name;
        if (post.description)
            result.description = post.description;
        result.likes = post.likes;
        area.trigger.outputs = result;
        await unsplashService._areaSchema.edit(area);
    }

    static async downloadIfNewPost(area: ARea, username: string, downloadPath: string): Promise<boolean> {
        try {
            if (!env.UNSPLASH_API_KEY || !nodeFetch)
                return false;
            const unsplash = createApi({
                accessKey: env.UNSPLASH_API_KEY,
                fetch: nodeFetch as any
            });
            const pics = await unsplash.users.getPhotos({ username: username });

            if (!pics || !pics.response?.results[0].id)
                return false;
            const pic = await unsplash.photos.get({ photoId: pics.response?.results[0].id });
            if (!pic.response?.links.download)
                return false;
            //ONLY LOG FOR DEBUG
            pics.response?.results.map((elem) => {
                console.log("Fetch image:");
                console.log(elem.id);
                console.log(elem.urls.raw);
            });
            if (!unsplashService.IsNewPost(area, pics.response?.results[0].id)) {
                console.log("Not a new post");
                await this.setDownloadInfos(area, downloadPath, pic.response);
                return false;
            }
            console.log("It's a new post: ", pic.response?.links.download);
            console.log("Downloaded at: ", downloadPath);
            const dlPic = await unsplash.photos.trackDownload({ downloadLocation: pic.response?.links.download });
            if (!dlPic.response?.url)
                return false;
            await utils.DownloadUrl(dlPic.response?.url, downloadPath);
            await this.setDownloadInfos(area, downloadPath, pic.response);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
            return false;
        }
        return true;
    }

    public static async downloadRandomPost(area: ARea, downloadPath: string): Promise<boolean> {
        if (!env.UNSPLASH_API_KEY || !nodeFetch)
            return false;
        try {
            const unsplash = createApi({
                accessKey: env.UNSPLASH_API_KEY,
                fetch: nodeFetch as any
            });

            const pic = await unsplash.photos.getRandom(undefined);
            console.log(pic.response);
            if (!pic || !pic.response)
                return false;
            if (Array.isArray(pic.response))
                return false;
            if (!pic.response?.links.download)
                return false;
            const dlPic = await unsplash.photos.trackDownload({ downloadLocation: pic.response?.links.download });
            if (!dlPic.response?.url)
                return false;
            await utils.DownloadUrl(dlPic.response?.url, downloadPath);
            this.setDownloadInfos(area, downloadPath, pic.response);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
            return false;
        }
        return true;
    }

    public static async getAccessToken(code: string) {

        const clientId = unsplashConfig.clientID;
        const clientSecret = unsplashConfig.clientSecret;
        const redirectUri = env.UNSPLASH_CALLBACK_MOBILE;

        if (!clientId || !clientSecret || !redirectUri)
            return;

        const url = "https://unsplash.com/oauth/token";
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
            console.log("[UNSPLASH] getAccessToken: ", (error as Error).toString());
            return;
        }
    }

    public static async getUserProfile(accessToken: string): Promise<Profile> {

        try {
            const res = await axios.get("https://api.unsplash.com/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const parsedData = res.data;
            const profile: Profile = {
                provider: OAuthProvider.UNSPLASH,
                name: {
                    givenName: parsedData.first_name,
                    familyName: parsedData.last_name
                },
                id: parsedData.uid,
                username: parsedData.username,
                displayName: parsedData.username || parsedData.uid,
                email: parsedData.email

            };
            return profile;
        } catch (error) {
            throw "[TWITCH] getUserProfile: " + (error as Error).toString();
        }
    }
}