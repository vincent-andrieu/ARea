import mongoose from "mongoose";

import { serverConfig } from "@config/serverConfig";

export default {

    async connect(): Promise<void> {
        const uris = `mongodb://${serverConfig.database.host}:${serverConfig.database.port}/${serverConfig.database.name}`;

        console.log("Connect to database...")
        await mongoose.connect(uris, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        .then(() => {
            console.info("DataBase successfully connected : \n\t- Address : " +
                serverConfig.database.host +
                "\n\t- Port : " + serverConfig.database.port +
                "\n\t- Name : " + serverConfig.database.name
            );
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
    }
};