import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from 'rxjs';
import { CookieService } from "ngx-cookie";

import { environment } from "@environment";

/**
 * Check if the user is login
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _cookieService: CookieService
    ) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise<boolean | UrlTree>((resolve) => {
            if (this._cookieService.hasKey(environment.cookiesKey.jwt))
                this._httpClient.get('/')
                    .pipe(catchError(() => of(resolve(this._router.parseUrl('/login')))))
                    .subscribe(() => resolve(true));

            return this._router.parseUrl('/login');
        });
    }

}