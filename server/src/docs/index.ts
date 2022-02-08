import { basicInfo } from "./basicInfo";
import { apiTags } from "./tags";
import { components } from "./components";
import areas from "./areas";
import service from "./service";

export = {
    ...basicInfo,
    ...apiTags,
    ...components,
    paths: {
        ...service,
        ...areas
    }
};