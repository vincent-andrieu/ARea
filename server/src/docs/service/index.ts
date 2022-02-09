import { getActionList } from "./getActionList";
import { getServiceList } from "./getServiceList";
import { getReactionList } from "./getReactionList";

export = {
    "/service/list": {
        ...getServiceList
    },
    "/service/action/{service}": {
        ...getActionList
    },
    "/service/reaction/{service}": {
        ...getReactionList
    }
};