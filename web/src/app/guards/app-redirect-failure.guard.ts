import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SnackbarService } from "@services/snackbar.service";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppRedirectFailureGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _snackbarService: SnackbarService
    ) {}

    canActivate(): Observable<UrlTree> | Promise<UrlTree> | UrlTree {
        this._snackbarService.openCustomError("Fail to login");

        return this._router.parseUrl('/login');
    }

}