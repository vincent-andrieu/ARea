import * as express from "express";
import { serverConfig } from "./config/serverConfig";

const app = express();

app.listen(serverConfig.port, () => {
    console.log(`Area server is listening on ${serverConfig.port}`);
}).on("error", (error) => {
    console.log(error.toString());
});