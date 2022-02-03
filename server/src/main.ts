import "module-alias/register";

import Database from "./init/database";
import Express from "./init/express";
import DiscordService from "./services/DiscordService";

Database.connect();

Express.connect();

DiscordService.connect(); // Start discord bot