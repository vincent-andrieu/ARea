import { createWriteStream } from "fs";
import { env } from "process";
import { Request } from "express";
import ip from "ip";
import sharp from "sharp";
import { HttpClient } from "typed-rest-client/HttpClient";

export enum EEnvType {
    PROD = "PROD",
    DEV = "DEV"
}

export class Utils {
    public static async DownloadUrl(url: string, filepath: string, convert = false) {
        try {
            const client = new HttpClient("clientTest");
            const response = await client.get(url);
            if (!filepath.startsWith("/tmp/"))
                filepath = `/tmp/${filepath}`;
            const file: NodeJS.WritableStream = createWriteStream(filepath);

            if (response.message.statusCode !== 200) {
                const err: Error = new Error(`Unexpected HTTP response: ${response.message.statusCode}`);
                err["httpStatusCode"] = response.message.statusCode;
                throw err;
            }
            console.log("moncul");
            console.log("url : ", url);
            console.log("filepath : ", filepath);

            return new Promise((resolve, reject) => {
                file.on("error", (err) => reject(err));
                const stream = response.message.pipe(file);
                stream.on("close", () => {
                    if (convert)
                        this.convertImage(filepath).then(
                            () => resolve(filepath)
                        );
                    else
                        resolve(filepath);
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

    public static getClientHost(req: Request | string): string {
        if (typeof req === "string")
            return req.endsWith("/") ? req.slice(0, -1) : req;

        if (!req.headers.referer)
            throw "Fail to get client host";
        return req.headers.referer.endsWith("/") ? req.headers.referer.slice(0, -1) : req.headers.referer;
    }
    public static getServerHost(): string {
        const envType: EEnvType = env.ENV_TYPE as EEnvType;

        if (envType === EEnvType.PROD)
            return `http://${env.SERVER_IP || ip.address()}:${env.SERVER_PORT}`;
        else if (envType === EEnvType.DEV)
            return `http://localhost:${env.SERVER_PORT}`;
        else
            throw "Invalid env type: " + envType;
    }
    public static getServerProxyHost(): string {
        if (!Number(env.SERVER_PROXY))
            console.warn("Proxy not activated !");

        const envType: EEnvType = env.ENV_TYPE as EEnvType;

        if (envType === EEnvType.PROD)
            return `https://${env.SERVER_IP || ip.address()}:${env.SERVER_PROXY_PORT}`;
        else if (envType === EEnvType.DEV)
            return `https://localhost:${env.SERVER_PROXY_PORT}`;
        else
            throw "Invalid env type: " + envType;
    }
}