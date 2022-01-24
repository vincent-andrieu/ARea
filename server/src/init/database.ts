import mongoose from "mongoose";

import { serverConfig } from "@config/serverConfig";

export default {

    async connect(): Promise<void> {
        let uris = `mongodb://${serverConfig.database.host}:${serverConfig.database.port}/${serverConfig.database.name}`;

        if (serverConfig.database.username && serverConfig.database.password)
            uris = `mongodb://${serverConfig.database.username}:${serverConfig.database.password}@${serverConfig.database.host}:${serverConfig.database.port}/${serverConfig.database.name}?authSource=admin`;

        console.log("Connect to database...");
        await mongoose.connect(uris, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.info("DataBase successfully connected :\n\t- Address : " +
            serverConfig.database.host +
            "\n\t- Port : " + serverConfig.database.port +
            "\n\t- Name : " + serverConfig.database.name
        );
    }
};