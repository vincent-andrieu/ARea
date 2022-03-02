/* eslint-disable indent */
import { env } from "process";
import { Dropbox } from "dropbox";
import { readFile } from "fs";
import ARea from "@classes/area.class";
import { DropboxUploadConfig } from "@models/ReactionConfig";
import Action, { ActionType } from "@classes/action.class";
import { DiscordMessageConfig, UnsplashPostConfig } from "@models/ActionConfig";
import User from "@classes/user.class";
import { GithubResult, RSSResult, TwitchStreamResult, TwitterTweetResult } from "@models/ActionResult";
import { Utils } from "./utils";

// import User from "../classes/user.class";

export class DropboxService {
    static uploadFile(user: User, filepath: string, dropboxFilepath: string) {

        if (!env.DROPBOX_API_KEY || !env.DROPBOX_API_SECRET_KEY || !user || !user.oauth || !user.oauth.dropbox)
            return;
        const client = new Dropbox({ clientId: env.DROPBOX_API_KEY, clientSecret: env.DROPBOX_API_SECRET_KEY, accessToken: user.oauth.dropbox?.accessToken });

        readFile(filepath, (err, contents) => {
            if (err)
                console.log("Error: ", err);

            if (!client)
                return;
            client.filesUpload({ path: dropboxFilepath, contents })
                .then((response: any) => {
                    console.log(response);
                })
                .catch((error: unknown) => {
                    const uploadErr = error as Error/* <files.UploadError> */;

                    console.log(uploadErr);
                });
        });
    }

    private static rea_unsplashUploadFile(area: ARea, user: User, config: DropboxUploadConfig) {
        const configUnsplash: UnsplashPostConfig = area.trigger.inputs as UnsplashPostConfig;
        const dropboxFilepath = (config.localFilepath ? config.localFilepath : configUnsplash.downloadPath);

        DropboxService.uploadFile(user, "/tmp/" + configUnsplash.downloadPath + ".webp", "/" + dropboxFilepath + ".webp");
    }

    private static rea_twitchUplaodThumbnail(area: ARea, user: User, config: DropboxUploadConfig) {
        const configTwitch: TwitchStreamResult = area.trigger.outputs as TwitchStreamResult;
        const twitchThumbnailTmpDownloadPath = "twitchThumbnailTmpDownloadPath";
        Utils.DownloadUrl(configTwitch.StreamThumbnailUrl, twitchThumbnailTmpDownloadPath);

        if (!config.remoteFilepath)
            return;
        this.uploadFile(user, twitchThumbnailTmpDownloadPath, config.remoteFilepath);
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
            } case ActionType.CRON: {
                if (!configDropbox.localFilepath || !configDropbox.remoteFilepath)
                    break;
                this.uploadFile(user, configDropbox.localFilepath, configDropbox.remoteFilepath);
                break;
            } case ActionType.DATETIME: {
                if (!configDropbox.localFilepath || !configDropbox.remoteFilepath)
                    break;
                this.uploadFile(user, configDropbox.localFilepath, configDropbox.remoteFilepath);
                break;
            } case ActionType.TWITCH_STREAM: {
                this.rea_twitchUplaodThumbnail(area, user, configDropbox);
                break;
            } case ActionType.TWITTER_MSG: {
                // TODO: get image if in tweet (I think I did try it but did not work)
                break;
            } default:
                console.log("todo upload file from parameter given");
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