import "module-alias/register";

import Express from "./init/express";
import DBDataset from "./init/DBDataset";
import CronService from "./services/CronService";

// Connection to the database and loading of the dataset.
DBDataset.init(false);

Express.connect();

// Action cron job
CronService.setup();