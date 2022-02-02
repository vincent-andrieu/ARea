import { env } from "process";
import { Dropbox } from "dropbox";

// import User from "../classes/user.class";

const token = "";

export function uploadFile(filepath: string/* , user: User */) {

    if (!env.DROPBOX_API_KEY || !env.DROPBOX_API_SECRET_KEY)
        return;

    const dbx = new Dropbox({ clientId: env.DROPBOX_API_KEY, clientSecret: env.DROPBOX_API_SECRET_KEY, accessToken: token /* user.ser.oauth.dropbox?.secretToken */ });
    dbx.filesListFolder({ path: "" })
        .then(function (response) {
            console.log(response.result.entries.at(0));
        })
        .catch(function (error) {
            console.log(error);
        });
    filepath;
}