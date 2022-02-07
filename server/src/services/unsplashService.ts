import { env } from "process";

import nodeFetch from "node-fetch";
import { createApi } from "unsplash-js";
import { readFile, createWriteStream } from "fs";
import { HttpClient } from "typed-rest-client/HttpClient";

export class unsplashService {

    static downloadedPath: string;
    static lastPostId: string | undefined;

    static getDownloadedPath(): string {
        return unsplashService.downloadedPath;
    }

    private static IsNewPost(postId: string | undefined): boolean {

        if (postId && postId != this.lastPostId)
            return true;
        return false;
    }

    private static async DownloadUrl(url: string, filepath: string) {
        try {
            const client = new HttpClient("clientTest");
            const response = await client.get(url);
            const file: NodeJS.WritableStream = createWriteStream(filepath);

            if (response.message.statusCode !== 200) {
                const err: Error = new Error(`Unexpected HTTP response: ${response.message.statusCode}`);
                err["httpStatusCode"] = response.message.statusCode;
                throw err;
            }
            return new Promise((resolve, reject) => {
                file.on("error", (err) => reject(err));
                const stream = response.message.pipe(file);
                stream.on("close", () => {
                    resolve(filepath);
                });
            });
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    static async DownloadIfNewPost(username: string, downloadPath: string): Promise<boolean> {
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
            if (!unsplashService.IsNewPost(pics.response?.results[0].id))
                return false;
            const pic = await unsplash.photos.get({ photoId: pics.response?.results[0].id });
            if (!pic.response?.links.download)
                return false;
            const dlPic = await unsplash.photos.trackDownload({ downloadLocation: pic.response?.links.download });

            if (!dlPic.response?.url)
                return false;
            await unsplashService.DownloadUrl(dlPic.response?.url, downloadPath);
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