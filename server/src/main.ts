import "module-alias/register";

import Express from "./init/express";
import DBDataset from "./init/DBDataset";
import { CronService } from "./services/CronService";

Express.connect();

// Connection to the database and loading of the dataset.
DBDataset.init(false);

// Action cron job
new CronService();