import * as express from "express";
import * as moment from "moment";

const router = express.Router();

router.get("/about.json", (req, res) => {
    const aboutJson = {
        client: {
            host: req.ip
        },
        server: {
            current_time: moment().unix()
        }
    };
    res.json(aboutJson);
});

router.get("/", (req, res) => {
    res.send("OK");
});

export default router;