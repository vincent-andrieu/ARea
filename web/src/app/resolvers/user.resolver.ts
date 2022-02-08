import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';

import User from "@classes/user.class";
import { AuthService } from "@services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    resolve(): Observable<User> {
        return this._httpClient.get<User>('/user')
            .pipe(map((user) => this._authService.user = user));
    }

}