import { AReaSchema } from "../schemas/area.schema";
import ARea from "../classes/area.class";
import { DateTimeConfg, TimeConfig } from "../model/ActionConfig";
import cron from "node-cron";
import CronService from "./CronService";
import { ObjectId } from "@classes/model.class";
import { ActionType } from "@classes/action.class";

interface TaskItem {
    task: cron.ScheduledTask;
    areaId: ObjectId;
}

export default class TimeService {

    private static _areaSchema: AReaSchema = new AReaSchema;
    private static _tasks: TaskItem[] = [];

    static initCronActions = async () => {
        try {
            const list: ARea[] = await this._areaSchema.fetchByAction(ActionType.CRON);

            list.forEach(el => {
                this.registerCron(el);
            });
        } catch (err: any) {
            console.error("TimeService::initCronActions ", err.message);
        }
    };

    static registerCron = (area: ARea): boolean => {
        try {
            const schedule: string | undefined = (area.trigger.inputs as TimeConfig)?.time;

            if (schedule == undefined || cron.validate(schedule) == false || area._id == undefined)
                return false;
            const job: cron.ScheduledTask = cron.schedule(schedule, () => CronService.triggerReaction(area), {
                timezone: "Europe/Paris"
            });
            this._tasks.push({ task: job, areaId: area._id as ObjectId });
            console.log("register", this._tasks);
            return true;
        } catch (err: any) {
            console.info("TimeService::registerCron fail to register. ", err.message);
            return false;
        }
    };

    static unregisterCron = (areaId: ObjectId) => {
        const item = this._tasks.find(el => {
            return JSON.stringify(el.areaId) === JSON.stringify(areaId);
        });
        if (item != undefined) {
            item?.task.stop();
            this._tasks = this._tasks.filter(el => el.areaId != areaId);
        }
    };

    static evalDatetime = (area: ARea): boolean => {
        try {
            const timestamp: number | undefined = (area.trigger.inputs as DateTimeConfg)?.time;

            if (timestamp == undefined) {
                console.error("TimeService::evalDatetime invalid area inputs.");
                return false;
            }
            if (timestamp && Date.now() >= timestamp) {
                (area.trigger.inputs as DateTimeConfg).time = 0;
                this._areaSchema.edit(area); // disable action
                return true;
            }
            return false;
        } catch (err: any) {
            console.error("TimeService::evalDatetime error ", err.message);
            return false;
        }
    };

}