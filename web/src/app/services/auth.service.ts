import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, of } from "rxjs";
import { CookieService } from "ngx-cookie";

import User from "@classes/user.class";
import { environment } from "@environment";
import { SnackbarService } from "./snackbar.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public readonly appsLoginButton: ReadonlyArray<{ iconSvgPath: string, name: string, redirect: string }> = [
        { iconSvgPath: 'assets/icons/github.svg', name: 'GitHub', redirect: '/github' },
        { iconSvgPath: 'assets/icons/twitch.svg', name: 'Twitch', redirect: '/twitch' },
        { iconSvgPath: 'assets/icons/twitter.svg', name: 'Twitter', redirect: '/twitter' },
        { iconSvgPath: 'assets/icons/discord.svg', name: 'Discord', redirect: '/discord' },
        { iconSvgPath: 'assets/icons/linkedin.svg', name: 'Linkedin', redirect: '/linkedin' },
        { iconSvgPath: 'assets/icons/notion.svg', name: 'Notion', redirect: '/notion' }
    ];

    constructor(
      private _httpClient: HttpClient,
        private _cookieService: CookieService,
      private _snackbarService: SnackbarService
    ) {}

    public login(email: string, password: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this._httpClient.post<User>('/auth/login', {
                username: email,
                password: password
            })
                .pipe(catchError((err: HttpErrorResponse) => {
                    reject(err);
                    this._snackbarService.openError(err);
                    return of(null);
                }))
                .subscribe((user: User | null) => {
                    if (!user)
                        return reject();
                    this._cookieService.put(environment.cookiesKey.jwt, user.token);
                    resolve(user);
                });
        });
    }

    public register(email: string, password: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this._httpClient.post<User>('/auth/register', {
                username: email,
                password: password
            })
                .pipe(catchError((err: HttpErrorResponse) => {
                    reject(err);
                    this._snackbarService.openError(err);
                    return of(null);
                }))
                .subscribe((user: User | null) => {
                    if (!user)
                        return reject();
                    this._cookieService.put(environment.cookiesKey.jwt, user.token);
                    resolve(user);
                });
        });
    }

    public redirectToApp(url: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            url = `/auth${url.startsWith('/') ? url : '/' + url}`;
            this._httpClient.get(url)
                .pipe(catchError((err) => {
                    this._snackbarService.openError(err);
                    return of(reject(err));
                }))
                .subscribe(() => resolve());
        });
    }
}