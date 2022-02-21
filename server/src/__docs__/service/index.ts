import { getActionList } from "./getActionList";
import { getServiceList } from "./getServiceList";
import { getReactionList } from "./getReactionList";
import { getAllReaction } from "./getAllReactions";
import { getAllAction } from "./getAllActions";

export = {
    "/service/list": {
        ...getServiceList
    },
    "/service/action/": {
        ...getAllAction
    },
    "/service/action/{service}": {
        ...getActionList
    },
    "/service/reaction": {
        ...getAllReaction
    },
    "/service/reaction/{service}": {
        ...getReactionList
    }
};