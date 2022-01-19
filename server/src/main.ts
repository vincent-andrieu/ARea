import "module-alias/register";
import Database from "./init/database";
import Express from "./init/express";

Express.connect();
Database.connect();