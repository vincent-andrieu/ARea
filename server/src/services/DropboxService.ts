/* eslint-disable indent */
import { env } from "process";
import { Dropbox } from "dropbox";
import { readFile } from "fs";
import ARea from "@classes/area.class";
import { DropboxUploadConfig } from "@models/ReactionConfig";
import Action, { ActionType } from "@classes/action.class";
import { UnsplashPostConfig } from "@models/ActionConfig";
import User from "@classes/user.class";

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

    public static rea_uploadFile(area: ARea, user: User) {
        const action: Action = area.trigger.action as Action;
        const configDropbox: DropboxUploadConfig = area.consequence.inputs as DropboxUploadConfig;

        switch (action.type) {
            case ActionType.UNSPLASH_POST: {
                const configUnsplash: UnsplashPostConfig = area.trigger.inputs as UnsplashPostConfig;
                const dropboxFilepath = (configDropbox.localFilepath ? configDropbox.localFilepath : configUnsplash.downloadPath);

                DropboxService.uploadFile(user, "/tmp/" + configUnsplash.downloadPath + ".webp", dropboxFilepath + ".webp");
                break;
            }
            default:
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