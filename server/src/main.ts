import "module-alias/register";

import Database from "./init/database";
import Express from "./init/express";
import { CronService } from "./services/CronService";

Express.connect();
Database.connect();

// Action cron job
new CronService();