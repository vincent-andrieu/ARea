import * as express from "express";

const app = express();
const port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.log(`Area server is listening on ${port}`);
}).on("error", (error) => {
    console.log(error.toString());
});