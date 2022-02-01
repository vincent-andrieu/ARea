import { env } from "process";

import nodeFetch from "node-fetch";
import { createApi } from "unsplash-js";


export async function getLastPictureFromUser(username: string): Promise<void> {

    if (!env.UNSPLASH_API_KEY || !nodeFetch)
        return;
    const unsplash = createApi({
        accessKey: env.UNSPLASH_API_KEY,
        fetch: nodeFetch as any
    });


    const pic = await unsplash.users.getPhotos({ username: username });
    console.log("pic : ", pic);
}


export async function getRandomPicture(): Promise<void> {

    if (!env.UNSPLASH_API_KEY || !nodeFetch)
        return;
    const unsplash = createApi({
        accessKey: env.UNSPLASH_API_KEY,
        fetch: nodeFetch as any
    });


    const pic = await unsplash.photos.getRandom({});
    console.log("pic : ", pic);
}