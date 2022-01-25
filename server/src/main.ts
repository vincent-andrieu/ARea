import "module-alias/register";

import Database from "./init/database";
import Express from "./init/express";
import DiscordBot from "./module/discord-bot";

DiscordBot.connect();
Express.connect();
Database.connect();