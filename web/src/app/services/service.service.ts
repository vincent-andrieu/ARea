import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, of } from "rxjs";

import { SnackbarService } from "./snackbar.service";
import Action from "@classes/action.class";
import Reaction from "@classes/reaction.class";

@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    constructor(
        private _httpClient: HttpClient,
        private _snackbarService: SnackbarService
    ) {}

    public getAction(): Promise<Array<Action>> {
        return new Promise<Array<Action>>((resolve, reject) => {
            this._httpClient.get<Array<Action>>('/service/action')
                .pipe(catchError((err) => {
                    reject(err);
                    this._snackbarService.openError(err);
                    return of([] as Array<Action>);
                }))
                .subscribe((result) =>
                    resolve(result.map((action) => new Action(action)))
                );
        });
    }

    public getReaction(): Promise<Array<Reaction>> {
        return new Promise<Array<Reaction>>((resolve, reject) => {
            this._httpClient.get<Array<Reaction>>('/service/reaction')
                .pipe(catchError((err) => {
                    reject(err);
                    this._snackbarService.openError(err);
                    return of([] as Array<Reaction>);
                }))
                .subscribe((result) => resolve(result.map((reaction) => new Reaction(reaction))));
        });
    }
}