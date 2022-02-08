import DBDataset from "init/DBDataset";
import "module-alias/register";

import Express from "./init/express";

Express.connect();

// Connection to the database and loading of the dataset.
DBDataset.init(false);

import { CronService } from "./services/CronService";

// Action cron job
new CronService();