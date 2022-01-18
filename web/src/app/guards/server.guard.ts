import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { environment } from "@environment";

@Injectable({
    providedIn: 'root'
})
export class ServerGuard implements CanActivate {

    constructor(private _router: Router, private _cookieService: CookieService) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._cookieService.hasKey(environment.cookiesKey.serverIp))
            return true;
        return this._router.parseUrl('/login');
    }

}