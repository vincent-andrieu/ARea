/* eslint-disable indent */
import { env } from "process";
import { Dropbox } from "dropbox";
import { readFile } from "fs";
import ARea from "@classes/area.class";
import { DropboxUploadConfig } from "@models/ReactionConfig";
import Action, { ActionType } from "@classes/action.class";
import { UnsplashPostConfig } from "@models/ActionConfig";
import User from "@classes/user.class";
import { TwitchStreamResult } from "@models/ActionResult";
import { Utils } from "./utils";

export class DropboxService {
    static uploadFile(user: User, filepath: string, dropboxFilepath: string): void {

        if (!env.DROPBOX_API_KEY || !env.DROPBOX_API_SECRET_KEY || !user || !user.oauth || !user.oauth.dropbox)
            return;
        if (!filepath.startsWith("/tmp/"))
            filepath = `/tmp/${filepath}`;
        const client = new Dropbox({ clientId: env.DROPBOX_API_KEY, clientSecret: env.DROPBOX_API_SECRET_KEY, accessToken: user.oauth.dropbox?.accessToken });

        readFile(filepath, (err, contents) => {
            if (err)
                console.error("Error: ", err);

            if (!client)
                return;
            console.log("dropboxFilepath :", dropboxFilepath);
            dropboxFilepath = "/" + dropboxFilepath;
            client.filesUpload({ path: dropboxFilepath, contents })
                .then((response: any) => {
                    console.log(response);
                })
                .catch((error: unknown) => {
                    const uploadErr = error as Error/* <files.UploadError> */;

                    console.error(uploadErr);
                });
        });
    }

    private static rea_unsplashUploadFile(area: ARea, user: User, config: DropboxUploadConfig) {
        const configUnsplash: UnsplashPostConfig = area.trigger.inputs as UnsplashPostConfig;
        const dropboxFilepath = (config.localFilepath ? config.localFilepath : configUnsplash.downloadPath);

        DropboxService.uploadFile(user, configUnsplash.downloadPath + ".webp", "/" + dropboxFilepath + ".webp");
    }

    private static async rea_twitchUplaodThumbnail(area: ARea, user: User, config: DropboxUploadConfig) {
        const configTwitch: TwitchStreamResult = area.trigger.outputs as TwitchStreamResult;
        const twitchThumbnailTmpDownloadPath = "twitchThumbnailTmpDownloadPath";
        try {
            await Utils.DownloadUrl(configTwitch.StreamThumbnailUrl, twitchThumbnailTmpDownloadPath, true);
        } catch (error) {
            console.error("Error downloading file from Twitch thumbnail: ", (error as Error).toString());
            return;
        }
        if (!config.remoteFilepath)
            return;
        this.uploadFile(user, twitchThumbnailTmpDownloadPath + ".webp", config.remoteFilepath + ".webp");
    }

    public static rea_uploadFile(area: ARea, user: User) {
        const action: Action = area.trigger.action as Action;
        const configDropbox: DropboxUploadConfig = area.consequence.inputs as DropboxUploadConfig;

        switch (action.type) {
            case ActionType.UNSPLASH_POST: {
                this.rea_unsplashUploadFile(area, user, configDropbox);
                break;
            } case ActionType.UNSPLASH_RANDOM_POST: {
                this.rea_unsplashUploadFile(area, user, configDropbox);
                break;
            } case ActionType.TWITCH_STREAM: {
                this.rea_twitchUplaodThumbnail(area, user, configDropbox);
                break;
            } default: {
                console.log("Dropbox upload reaction has no compatible action");
            }
        }
    }

    static listFolders(user: User, path = "") {

        if (!env.DROPBOX_API_KEY || !env.DROPBOX_API_SECRET_KEY || !user || !user.oauth || !user.oauth.dropbox)
            return;
        const client = new Dropbox({ clientId: env.DROPBOX_API_KEY, clientSecret: env.DROPBOX_API_SECRET_KEY, accessToken: user.oauth.dropbox?.accessToken });

        client.filesListFolder({ path: path })
            .then(function (response) {
                console.log(response.result.entries[0]);
            })
            .catch(function (error) {
                console.error(error);
            });

    }
}