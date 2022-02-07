import { env } from "process";

import nodeFetch from "node-fetch";
import { createApi } from "unsplash-js";
import ARea from "@classes/area.class";
import { Full } from "unsplash-js/dist/methods/photos/types";
import { UnsplashPostResult } from "model/ActionResult";
import { utils } from "./utils";

export class unsplashService {

    static downloadedPath: string;
    static lastPostId: string | undefined;

    static getDownloadedPath(): string {
        return unsplashService.downloadedPath;
    }

    private static IsNewPost(area: ARea, postId: string): boolean {
        const last: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult;
        if (last.lastPostId == postId)
            return false;
        last.lastPostId = postId;
        return true;
    }

    private static setDownloadInfos(area: ARea, downloadUrl: string, post: Full) {
        const result: UnsplashPostResult = area.trigger.outputs as UnsplashPostResult;

        result.downloadPath = downloadUrl;
        result.created_at = post.created_at;
        result.name = post.user.first_name;
        if (post.user.last_name)
            result.lastname = post.user.last_name;
        if (post.description)
            result.description = post.description;
        result.likes = post.likes;
    }

    static async DownloadIfNewPost(area: ARea, username: string, downloadPath: string): Promise<boolean> {
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
            if (!unsplashService.IsNewPost(area, pics.response?.results[0].id))
                return false;
            const pic = await unsplash.photos.get({ photoId: pics.response?.results[0].id });
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

    public static async GetRandomPicture(): Promise<void> {
        if (!env.UNSPLASH_API_KEY || !nodeFetch)
            return;
        try {
            const unsplash = createApi({
                accessKey: env.UNSPLASH_API_KEY,
                fetch: nodeFetch as any
            });

            const pic = await unsplash.photos.getRandom({});
            console.log("pic : ", pic);
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }
}