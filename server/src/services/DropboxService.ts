import { env } from "process";
import { Dropbox, files } from "dropbox";
import { readFile } from "fs";

// import User from "../classes/user.class";

const token = "sl.BBSyaeyLST13F7QqeGQQFgBtwWUUAVUPzLhaY46CsJVHSYAojEc8JETW_W3x9Ds1it9ejAI2J8JF41SZ-ocQQmDMwtQlD3DLKH2lH0Y6pd_6IitoPi17XiyV3EFwWljPuNqGpfg";

export class DropboxService {

    client: Dropbox | null = null;

    constructor() {
        this.setClient();
    }

    setClient(/* user: User */) {
        if (!env.DROPBOX_API_KEY || !env.DROPBOX_API_SECRET_KEY /* || !user.oauth.dropbox */)
            return;
        this.client = new Dropbox({ clientId: env.DROPBOX_API_KEY, clientSecret: env.DROPBOX_API_SECRET_KEY, accessToken: token /* user.oauth.dropbox?.secretToken */ });
    }
    uploadFile(filepath: string, dropboxFilepath: string) {

        readFile(filepath, "utf-8", (err, contents) => {
            if (err)
                console.log("Error: ", err);

            if (!this.client)
                return;
            this.client.filesUpload({ path: dropboxFilepath, contents })
                .then((response: any) => {
                    console.log(response);
                });
            // .catch((uploadErr: Error<files.UploadError>) => {
            // console.log(uploadErr);
            // });
        });
    }

    listFolders(path = "") {

        if (!this.client)
            return;
        this.client.filesListFolder({ path: path })
            .then(function (response) {
                console.log(response.result.entries.at(0));
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}