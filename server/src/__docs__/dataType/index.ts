import { reactionConfig } from "./reactionConfig";
import { actionConfig } from "./actionConfig";
import { parameters } from "./parameters";
import { reactionType } from "./reactionType";
import { actionType } from "./actionType";
import { reaction } from "./reaction";
import { action } from "./action";
import { serviceResponse } from "./service";
import { serviceType } from "./serviceType";
import { userInput } from "./userInput";
import { user } from "./user";
import { oauthLoginProvider } from "./oauthLoginProvider";
import { actionResult } from "./actionResult";

export = {
    ...oauthLoginProvider,
    ...userInput,
    ...user,
    ...serviceType,
    ...reaction,
    ...action,
    ...reactionType,
    ...actionType,
    ...reactionConfig,
    ...actionConfig,
    ...actionResult,
    ...parameters,
    ...serviceResponse
};