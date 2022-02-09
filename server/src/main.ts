import "module-alias/register";

import Express from "./init/express";
import DBDataset from "./init/DBDataset";
import CronService from "./services/CronService";
import { sys } from "typescript";

(async function() {
    // Connection to the database and loading of the dataset.
    try {
        await DBDataset.init(false);
    } catch (error) {
        console.error("DBDataset.init(): ", (error as Error).toString());
        sys.exit(1);
    }
    Express.connect();

    // Action cron job
    CronService.setup();

}());