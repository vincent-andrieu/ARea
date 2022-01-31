import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
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

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const urlToken: string = route.queryParams['token'];

        if (urlToken && urlToken.length > 0)
            this._cookieService.put(environment.cookiesKey.jwt, urlToken);

        if (this._cookieService.hasKey(environment.cookiesKey.jwt))
            return new Promise<boolean | UrlTree>((resolve) => {
                this._httpClient.get('/')
                    .pipe(catchError(() => of(resolve(this._router.parseUrl('/login')))))
                    .subscribe(() => resolve(true));
            });
        return this._router.parseUrl('/login');
    }

}