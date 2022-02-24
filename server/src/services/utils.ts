import { readFile, createWriteStream } from "fs";
import sharp from "sharp";
import { HttpClient } from "typed-rest-client/HttpClient";

export class utils {
    public static async DownloadUrl(url: string, filepath: string, convert = false) {
        try {
            const client = new HttpClient("clientTest");
            const response = await client.get(url);
            filepath = `/tmp/${filepath}`;
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
                    if (convert)
                        this.convertImage(filepath).then(
                            () => {resolve(filepath);}
                        );
                });
            });
        } catch (error) {
            const some_error = error as Error;

            console.log(some_error);
        }
    }

    public static async createCompressedImage(imagePath: string, sizeX = 250, sizeY = 250) {
        imagePath = `/tmp/${imagePath}`;
        try {
            await sharp(imagePath)
                .webp({ quality: 100 })
                .resize(sizeX, sizeY)
                .toFile(`${imagePath}.webp`);
            console.log(`Compressed ${imagePath} !`);
        } catch (error) {
            console.log("createCompressedImage:", (error as Error).message);
        }
    }

    public static async convertImage(imagePath: string) {
        try {
            await sharp(imagePath)
                .toFile(`${imagePath}.webp`);
            console.log(`Converted ${imagePath} !`);
        } catch (error) {
            console.log("convertImage:", (error as Error).message);
        }
    }
}