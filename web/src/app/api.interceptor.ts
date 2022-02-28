import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie";

import { environment } from "@environment";
import { SnackbarService } from "./services/snackbar.service";

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    constructor(
        private _cookieService: CookieService,
        private _snackbarService: SnackbarService
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let apiRequest: typeof request = request;

        if (
            !request.url.startsWith('http://')
            && !request.url.startsWith('https://')
            && this._cookieService.hasKey(environment.cookies.serverHost.name)
        ) {
            apiRequest = apiRequest.clone({ url: `${this._cookieService.get(environment.cookies.serverHost.name)}${apiRequest.url.startsWith("/") ? "" : "/"}${apiRequest.url}` });

            if (!request.headers.has('Authorization') && this._cookieService.hasKey(environment.cookies.jwt.name))
                apiRequest = apiRequest.clone({ headers: apiRequest.headers.append('Authorization', 'Bearer ' + this._cookieService.get(environment.cookies.jwt.name)) });
        }

        return next.handle(apiRequest);
    }
}