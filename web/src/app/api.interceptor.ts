import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";

import { environment } from "@environment";

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    constructor(private _cookieService: CookieService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let apiRequest: typeof request = request;

        if (
            !request.url.startsWith('http://')
            && !request.url.startsWith('https://')
            && this._cookieService.hasKey(environment.cookiesKey.serverIp)
        ) {
            apiRequest = apiRequest.clone({ url: `${this._cookieService.get(environment.cookiesKey.serverIp)}/${apiRequest.url}` });

            if (!request.headers.has('Authorization') && this._cookieService.hasKey(environment.cookiesKey.jwt))
                apiRequest.clone({ headers: apiRequest.headers.append('Authorization', 'Bearer ' + this._cookieService.get(environment.cookiesKey.jwt)) });
        }

        return next.handle(apiRequest);
    }
}