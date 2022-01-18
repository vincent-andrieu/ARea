import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie';

import { environment } from "@environment";
import { HttpClient } from "@angular/common/http";

/**
 * Check if the user is already connect. Redirect to areas list if already connected.
 */
@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _cookieService: CookieService
    ) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise<boolean | UrlTree>((resolve) => {
            if (this._cookieService.hasKey(environment.cookiesKey.jwt))
                this._httpClient.get('/')
                    .pipe(catchError(() => of(resolve(true))))
                    .subscribe(() => resolve(this._router.parseUrl('/areas')));

            return true;
        });
    }

}