import { basicInfo } from "./basicInfo";
import { apiTags } from "./tags";
import { components } from "./components";
import areas from "./areas";
import service from "./service";
import config from "./config";
import auth from "./auth";
import user from "./user";
import app from "./app";

export = {
    ...basicInfo,
    ...apiTags,
    ...components,
    paths: {
        ...app,
        ...auth,
        ...user,
        ...service,
        ...areas,
        ...config
    }
};