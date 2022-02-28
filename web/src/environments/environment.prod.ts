import * as moment from "moment";
import { CookieOptions } from "ngx-cookie";

export const environment = {
    production: true,
    cookies: {
        serverHost: {
            name: 'server',
            get options(): CookieOptions {
                return {
                    sameSite: true
                };
            }
        },
        jwt: {
            name: 'auth',
            get options(): CookieOptions {
                return {
                    expires: moment().add(2, 'hours').toDate(),
                    sameSite: true,
                    storeUnencoded: false
                };
            }
        }
    },
    mobile: {
        filepath: '/assets/client/area_mobile.apk'
    }
};