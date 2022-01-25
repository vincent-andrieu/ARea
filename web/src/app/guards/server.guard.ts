import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

import { environment } from "@environment";
import { SnackbarService } from "app/services/snackbar.service";

/**
 * Redirect to home page if server ip isn't set
 */
@Injectable({
    providedIn: 'root'
})
export class ServerGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _cookieService: CookieService,
        private _snackbarService: SnackbarService
    ) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._cookieService.hasKey(environment.cookiesKey.serverHost))
            return true;

        this._snackbarService.openCustomError("Server IP isn't set");
        return this._router.parseUrl('/');
    }

}