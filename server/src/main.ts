import "module-alias/register";
import Database from "./init/database";
import "./init/express";

// Database example
Database.connect();