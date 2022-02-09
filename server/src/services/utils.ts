import { readFile, createWriteStream } from "fs";
import { HttpClient } from "typed-rest-client/HttpClient";

export class utils {
    public static async DownloadUrl(url: string, filepath: string) {
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
}