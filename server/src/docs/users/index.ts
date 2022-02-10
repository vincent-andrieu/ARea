import { login } from "./login";
import { register } from "./register";

export = {
    "/auth/register": {
        ...register
    },
    "/auth/login": {
        ...login
    }
}