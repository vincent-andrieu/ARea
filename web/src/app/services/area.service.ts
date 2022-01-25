import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, of } from "rxjs";

import ARea from "@classes/area.class";
import { SnackbarService } from "./snackbar.service";

@Injectable({
    providedIn: 'root'
})
export class AreaService {

    constructor(
        private _httpClient: HttpClient,
        private _snackbarService: SnackbarService
    ) {}

    public getAreas(): Promise<Array<ARea>> {
        return new Promise<Array<ARea>>((resolve, reject) => {
            this._httpClient.get<Array<ARea>>('/area/list')
                .pipe(catchError((err: HttpErrorResponse) => {
                    this._snackbarService.openError(err);
                    reject(err);
                    return of([]);
                }))
                .subscribe((result) => resolve(result));
        });
    }
}