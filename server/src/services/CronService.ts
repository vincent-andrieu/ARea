import cron from "node-cron";
import { ReactionSchema } from "../schemas/reaction.schema";

export class CronService {

    private _reactionSchema: ReactionSchema = new ReactionSchema();
    private _cron;

    constructor() {
        this._cron = cron.schedule("* * * * *", this.execute, { scheduled: false });
        this.start();
        this.execute(); // first execution
    }

    public start = () => {
        this._cron.start();
    };

    public stop = () => {
        this._cron.stop();
    };

    public execute = () => {
        console.log("running CRON every minute");

        // Fetch action-reactions
        //const areas = await this._reactionSchema.getCronArea();

        // Browse actions
        //      |=> execute actions requests
        //      |=> analyse result
        //          |=> (?) => trigger linked reactions
    };
}