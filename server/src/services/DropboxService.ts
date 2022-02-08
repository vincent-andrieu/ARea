import { env } from "process";
import { Dropbox } from "dropbox";
import { readFile } from "fs";

// import User from "../classes/user.class";

const token = "";

export class DropboxService {
    static uploadFile(/* user: User, */filepath: string, dropboxFilepath: string) {

        if (!env.DROPBOX_API_KEY || !env.DROPBOX_API_SECRET_KEY /* || !user.oauth.dropbox */)
            return;
        const client = new Dropbox({ clientId: env.DROPBOX_API_KEY, clientSecret: env.DROPBOX_API_SECRET_KEY, accessToken: token /* user.oauth.dropbox?.secretToken */ });

        readFile(filepath, "utf-8", (err, contents) => {
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

    static listFolders(/* user: User, */path = "") {

        if (!env.DROPBOX_API_KEY || !env.DROPBOX_API_SECRET_KEY /* || !user.oauth.dropbox */)
            return;
        const client = new Dropbox({ clientId: env.DROPBOX_API_KEY, clientSecret: env.DROPBOX_API_SECRET_KEY, accessToken: token /* user.oauth.dropbox?.secretToken */ });

        client.filesListFolder({ path: path })
            .then(function (response) {
                console.log(response.result.entries[0]);
            })
            .catch(function (error) {
                console.error(error);
            });

    }
}