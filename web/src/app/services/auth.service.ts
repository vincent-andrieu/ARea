import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { catchError, of } from "rxjs";
import { CookieService } from "ngx-cookie";

import { environment } from "@environment";
import User from "@classes/user.class";
import { ServiceType } from "@classes/model/ServiceType";
import { SnackbarService } from "./snackbar.service";

export interface ServiceData {
    iconSvgPath: string;
    label: string;
    name: ServiceType;
    redirect: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public readonly apps: ReadonlyArray<ServiceData> = [
        { iconSvgPath: 'assets/icons/github.svg', label: 'GitHub', name: ServiceType.GITHUB, redirect: '/github' },
        { iconSvgPath: 'assets/icons/twitch.svg', label: 'Twitch', name: ServiceType.TWITCH, redirect: '/twitch' },
        { iconSvgPath: 'assets/icons/twitter.svg', label: 'Twitter', name: ServiceType.TWITTER, redirect: '/twitter' },
        { iconSvgPath: 'assets/icons/dropbox.svg', label: 'Dropbox', name: ServiceType.DROPBOX, redirect: '/dropbox' },
        { iconSvgPath: 'assets/icons/discord.svg', label: 'Discord', name: ServiceType.DISCORD, redirect: '/discord' },
        { iconSvgPath: 'assets/icons/linkedin.svg', label: 'Linkedin', name: ServiceType.LINKEDIN, redirect: '/linkedin' },
        { iconSvgPath: 'assets/icons/notion.svg', label: 'Notion', name: ServiceType.NOTION, redirect: '/notion' },
        { iconSvgPath: 'assets/icons/unsplash.svg', label: 'Unsplash', name: ServiceType.UNSPLASH, redirect: '/unsplash' }
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
                    this._cookieService.put(environment.cookies.jwt.name, user.token, environment.cookies.jwt.options);
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
                    this._cookieService.put(environment.cookies.jwt.name, user.token, environment.cookies.jwt.options);
                    this.user = user;
                    resolve(user);
                });
        });
    }

    public loginToService(service: ServiceType): void {
        let url: string | undefined = this.apps.find((app) => app.name === service)?.redirect;

        if (!url)
            throw "Service URL not found";
        const host = this._cookieService.get(environment.cookies.serverHost.name);

        url = `${host}${host.endsWith('/') ? 'auth' : '/auth'}${url.startsWith('/') ? url : '/' + url}`;

        const token = this._cookieService.get(environment.cookies.jwt.name);

        if (token && token.length > 0) {
            if (!url.endsWith('/'))
                url = url.concat('/');
            url = url.concat('?token=', token);
        }
        if (service !== ServiceType.DISCORD)
            window.location.href = url;
        else
            window.open(url, '_blank');
    }

    public disconnectFromService(name: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._httpClient.post<void>(`/auth/disconnect/${name.toLowerCase()}`, undefined)
                .pipe(catchError((err) => {
                    this._snackbarService.openError(err);
                    return of(reject(err));
                }))
                .subscribe(() => resolve());
        });
    }

    public logout(): void {
        this._cookieService.remove(environment.cookies.jwt.name);

        const host = this._cookieService.get(environment.cookies.serverHost.name);

        window.location.href = `${host}${host.endsWith('/') ? 'auth' : '/auth'}/logout`;
    }
}