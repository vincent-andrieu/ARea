import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { catchError, firstValueFrom, of } from "rxjs";
import { CookieService } from "ngx-cookie";

import User from "@classes/user.class";
import { environment } from "@environment";
import { SnackbarService } from "./snackbar.service";

export interface ServiceData {
    iconSvgPath: string;
    label: string;
    name: string;
    redirect: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public readonly apps: ReadonlyArray<ServiceData> = [
        { iconSvgPath: 'assets/icons/github.svg', label: 'GitHub', name: 'github', redirect: '/github' },
        { iconSvgPath: 'assets/icons/twitch.svg', label: 'Twitch', name: 'twitch', redirect: '/twitch' },
        { iconSvgPath: 'assets/icons/twitter.svg', label: 'Twitter', name: 'twitter', redirect: '/twitter' },
        { iconSvgPath: 'assets/icons/discord.svg', label: 'Discord', name: 'discord', redirect: '/discord' },
        { iconSvgPath: 'assets/icons/linkedin.svg', label: 'Linkedin', name: 'linkedin', redirect: '/linkedin' },
        { iconSvgPath: 'assets/icons/notion.svg', label: 'Notion', name: 'notion', redirect: '/notion' }
    ];
    private _user?: User;

    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _cookieService: CookieService,
        private _snackbarService: SnackbarService
    ) {}

    public get user(): User {
        if (!this._user)
            throw "Undefined user";
        return this._user;
    }

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
                    this._user = user;
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

    public loginToService(url: string): void {
        const host = this._cookieService.get(environment.cookiesKey.serverHost);

        url = `${host}${host.endsWith('/') ? 'auth' : '/auth'}${url.startsWith('/') ? url : '/' + url}`;
        window.location.href = url;
    }

    public async disconnectFromService(name: string): Promise<void> {
        return await firstValueFrom(this._httpClient.post<void>(`/auth/disconnect/${name}`, {}))
            .catch((err) => this._snackbarService.openError(err));
    }

    public logout(): void {
        this._cookieService.remove(environment.cookiesKey.jwt);
        this._router.navigateByUrl("/login");
    }
}