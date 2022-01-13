import mongoose from "mongoose";

import { serverConfig } from "@config/serverConfig";

export default {

    async connect(): Promise<void> {
        const uris = `mongodb://${serverConfig.database.host}:${serverConfig.database.port}/${serverConfig.database.name}`;

        await mongoose.connect(uris, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.info("DataBase successfully connected : \n\t- Address : " +
                serverConfig.database.host +
                "\n\t- Port : " + serverConfig.database.port +
                "\n\t- Name : " + serverConfig.database.name
        );
    }
};