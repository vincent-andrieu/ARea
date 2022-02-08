import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { catchError, firstValueFrom, of } from "rxjs";
import { CookieService } from "ngx-cookie";

import { environment } from "@environment";
import User from "@classes/user.class";
import { ServiceName } from "@classes/model/services";
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
        { iconSvgPath: 'assets/icons/github.svg', label: 'GitHub', name: ServiceName.GITHUB, redirect: '/github' },
        { iconSvgPath: 'assets/icons/twitch.svg', label: 'Twitch', name: ServiceName.TWITCH, redirect: '/twitch' },
        { iconSvgPath: 'assets/icons/twitter.svg', label: 'Twitter', name: ServiceName.TWITTER, redirect: '/twitter' },
        { iconSvgPath: 'assets/icons/dropbox.svg', label: 'Dropbox', name: ServiceName.DROPBOX, redirect: '/dropbox' },
        { iconSvgPath: 'assets/icons/discord.svg', label: 'Discord', name: ServiceName.DISCORD, redirect: '/discord' },
        { iconSvgPath: 'assets/icons/linkedin.svg', label: 'Linkedin', name: ServiceName.LINKEDIN, redirect: '/linkedin' },
        { iconSvgPath: 'assets/icons/notion.svg', label: 'Notion', name: ServiceName.NOTION, redirect: '/notion' },
        { iconSvgPath: 'assets/icons/unsplash.svg', label: 'Unsplash', name: ServiceName.UNSPLASH, redirect: '/unsplash' }
    ];

    public user?: User;

    constructor(
        private _router: Router,
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
                    this.user = user;
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