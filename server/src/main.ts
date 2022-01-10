import * as express from "express";
import { serverConfig } from "./config/serverConfig";
import appRoutes from "./routes/appRoutes";

const app = express();

app.use(appRoutes);

app.listen(serverConfig.port, () => {
    console.log(`Area server is listening on ${serverConfig.port}`);
}).on("error", (error) => {
    console.log(error.toString());
});