import { AReaSchema } from "../schemas/area.schema";
import ARea from "@classes/area.class";
import User from "@classes/user.class";
import { DateTimeConfig, TimeConfig } from "../models/ActionConfig";
import cron from "node-cron";
import CronService from "./CronService";
import { ObjectId } from "@classes/model.class";
import { ActionType } from "@classes/action.class";
import { UserSchema } from "@schemas/user.schema";
import { DateTimeResult } from "@models/ActionResult";
import moment from "moment";

interface TaskItem {
    task: cron.ScheduledTask;
    areaId: ObjectId;
}

export default class TimeService {

    private static _areaSchema: AReaSchema = new AReaSchema;
    private static _userSchema: UserSchema = new UserSchema;
    private static _tasks: TaskItem[] = [];

    static initCronActions = async () => {
        try {
            const list: ARea[] = await this._areaSchema.fetchByAction(ActionType.CRON);

            list.forEach(async (el: ARea) => {
                const user: User = await this._userSchema.getUserByAReaId(el);

                this.registerCron(el, user);
            });
        } catch (err) {
            console.error("TimeService::initCronActions ", (err as Error).message);
        }
    };

    static registerCron = (area: ARea, user: User): boolean => {
        try {
            const schedule: string | undefined = (area.trigger.inputs as TimeConfig)?.time;

            if (schedule == undefined || cron.validate(schedule) == false || area._id == undefined)
                return false;
            const job: cron.ScheduledTask = cron.schedule(schedule, () => {
                try {
                    CronService.triggerReaction(area, user);
                } catch (err) {
                    console.error(`TimeService: cron action, an error occurred ${err}`);
                }
            }, {
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
            this._tasks = this._tasks.filter(el => JSON.stringify(el.areaId) !== JSON.stringify(areaId));
            console.log("CRON action unregistered");
        }
    };

    static evalDatetime = (area: ARea): boolean => {
        try {
            const timestamp: number | undefined = parseInt((area.trigger.inputs as DateTimeConfig)?.time);
            const result: DateTimeResult = ({} as DateTimeResult);

            if (timestamp == undefined || isNaN(timestamp)) {
                console.error("TimeService::evalDatetime invalid area inputs.");
                return false;
            }
            if (timestamp > 0 && Date.now() >= timestamp) {
                result.time = moment((area.trigger.inputs as DateTimeConfig).time).format("DD/MM/YYYY HH:mm");
                area.trigger.outputs = result;
                (area.trigger.inputs as DateTimeConfig).time = "0";
                this._areaSchema.edit(area); // disable action
                return true;
            }
            return false;
        } catch (err) {
            console.error("TimeService::evalDatetime error ", (err as Error).message);
            return false;
        }
    };

}