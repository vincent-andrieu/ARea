import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie";
import { catchError, Observable, of, Subject } from "rxjs";

import { environment } from "@environment";

@Injectable({
    providedIn: 'root'
})
export class ServerService {

    public onHostUpdate = new Subject<string>();

    constructor(
        private _httpClient: HttpClient,
        private _cookieService: CookieService
    ) {}

    public get onHostUpdate$(): Observable<string> {
        return this.onHostUpdate.asObservable();
    }

    public setHost(host: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._httpClient.get(host, { observe: 'response' })
                .pipe(catchError((err: HttpErrorResponse) => of(err)))
                .subscribe((response) => {
                    if (response.status !== 0) {
                        this._cookieService.remove(environment.cookies.jwt.name);
                        this._cookieService.put(environment.cookies.serverHost.name, host, environment.cookies.serverHost.options);
                        resolve();
                        this.onHostUpdate.next(host);

                    } else
                        reject((response as HttpErrorResponse).error);
                });
        });
    }

    public getHost(): string {
        return this._cookieService.get(environment.cookies.serverHost.name);
    }

    public downloadMobileApp(): void {
        window.location.href = environment.mobile.filepath;
    }
}