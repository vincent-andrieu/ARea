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

    public getAll(): Promise<Array<ARea>> {
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

    public add(area: ARea): Promise<ARea> {
        return new Promise<ARea>((resolve, reject) => {
            this._httpClient.put<ARea>('/area/add', area)
                .pipe(catchError((err: HttpErrorResponse) => {
                    this._snackbarService.openError(err);
                    reject(err);
                    return of(undefined);
                }))
                .subscribe((result) => {
                    if (result)
                        resolve(result);
                });
        });
    }

    public edit(area: ARea): Promise<ARea> {
        return new Promise<ARea>((resolve, reject) => {
            this._httpClient.post<ARea>('/area/edit', area)
                .pipe(catchError((err: HttpErrorResponse) => {
                    this._snackbarService.openError(err);
                    reject(err);
                    return of(undefined);
                }))
                .subscribe((result) => {
                    if (result)
                        resolve(result);
                });
        });
    }
}