import "module-alias/register";
import Database from "./init/database";
import "./init/express";
import DiscordBot from "./module/discord-bot";

DiscordBot.connect();

// Database example
Database.connect();