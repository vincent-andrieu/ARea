import { Request, Response } from "express";
import cron from "node-cron";
import CronService from "../services/CronService";

export default class ConfigController {

    static configCronSchedule = async (req: Request, res: Response) => {
        const userId = req.user?.data.user_id;
        const schedule: string | unknown = req.body.schedule;

        try {
            if (!userId || userId.length === 0 || !req.user?.data.user_id)
                throw "Unknow user id";
            if (schedule === undefined)
                throw "Missing parameter schedule";
            if (cron.validate(schedule as string) == false)
                throw "Invalid schedule";
            console.log("Reset cron ", schedule);
            CronService.reset(schedule as string);
            return res.status(200).send("OK");
        } catch (err) {
            return res.status(400).send((err as Error).toString());
        }
    };

}