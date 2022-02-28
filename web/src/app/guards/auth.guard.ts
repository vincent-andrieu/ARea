import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Title } from "@angular/platform-browser";
import { catchError, Observable, of } from 'rxjs';
import { CookieService } from "ngx-cookie";

import { environment } from "@environment";
import User from "@classes/user.class";

/**
 * Check if the user is login
 */
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private _title: Title,
        private _router: Router,
        private _httpClient: HttpClient,
        private _cookieService: CookieService
    ) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const urlToken: string = route.queryParams['token'];

        if (urlToken && urlToken.length > 0)
            this._cookieService.put(environment.cookies.jwt.name, urlToken, environment.cookies.jwt.options);

        if (this._cookieService.hasKey(environment.cookies.jwt.name))
            return new Promise<boolean | UrlTree>((resolve) => {
                this._httpClient.get<User>('/user')
                    .pipe(catchError(() => of(resolve(this._router.parseUrl('/login')))))
                    .subscribe((user: User | void) => {
                        if (user)
                            this._title.setTitle("ARea - " + user.username);
                        else
                            this._title.setTitle("ARea");
                        resolve(true);
                    });
            });
        return this._router.parseUrl('/login');
    }

}