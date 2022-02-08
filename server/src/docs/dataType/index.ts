import { reactionConfig } from "./reactionConfig";
import { actionConfig } from "./actionConfig";
import { parameters } from "./parameters";
import { reactionType } from "./reactionType";
import { actionType } from "./actionType";
import { reaction } from "./reaction";
import { action } from "./action";
import { serviceResponse } from "./service";
import { serviceType } from "./serviceType";

export = {
    ...serviceType,
    ...reaction,
    ...action,
    ...reactionType,
    ...actionType,
    ...reactionConfig,
    ...actionConfig,
    ...parameters,
    ...serviceResponse
};