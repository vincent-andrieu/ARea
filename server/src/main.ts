import "module-alias/register";
import { env } from "process";
import { sys } from "typescript";
import ip from "ip";

import Express from "./init/express";
import DBDataset from "./init/DBDataset";
import ProxySSL from "./init/proxy";
import CronService from "./services/CronService";

console.info("Host IP:", ip.address());

(async function() {
    // Connection to the database and loading of the dataset.
    try {
        await DBDataset.init(false);
    } catch (error) {
        console.error("DBDataset.init(): ", (error as Error).toString());
        sys.exit(1);
    }
    Express.connect().then(() => {
        if (Number(env.SERVER_PROXY))
            new ProxySSL(
                () => console.log("ProxySSL closed !"),
                (err) => {
                    console.error("ProxySSL error:", err);
                }
            );
    });

    // Action cron job
    CronService.setup();

}());