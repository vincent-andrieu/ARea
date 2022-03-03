import { env } from "process";

import nodeFetch from "node-fetch";
import { createApi } from "unsplash-js";
import { Full, Random } from "unsplash-js/dist/methods/photos/types";

import ARea from "@classes/area.class";
import { UnsplashPostResult } from "@models/ActionResult";
import { Utils } from "./utils";
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
        result.link = post.links.html;
        result.username = post.user.username;
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
            if (!unsplashService.IsNewPost(area, pics.response?.results[0].id)) {
                await this.setDownloadInfos(area, downloadPath, pic.response);
                return false;
            }
            const dlPic = await unsplash.photos.trackDownload({ downloadLocation: pic.response?.links.download });
            if (!dlPic.response?.url)
                return false;
            await Utils.DownloadUrl(dlPic.response?.url, downloadPath, true);
            await this.setDownloadInfos(area, downloadPath, pic.response);
        } catch (error) {
            const some_error = error as Error;

            console.error(some_error);
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
            await Utils.DownloadUrl(dlPic.response?.url, downloadPath, true);
            await this.setDownloadInfos(area, downloadPath, pic.response);
        } catch (error) {
            const some_error = error as Error;

            console.error(some_error);
            return false;
        }
        return true;
    }
}