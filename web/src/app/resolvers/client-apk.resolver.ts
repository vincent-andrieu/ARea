import { Injectable } from '@angular/core';
import {
    Resolve} from '@angular/router';
import { ServerService } from "@services/server.service";

@Injectable({
    providedIn: 'root'
})
export class ClientApkResolver implements Resolve<void> {

    constructor(private _serverService: ServerService) {}

    resolve(): void {
        this._serverService.downloadMobileApp();
    }

}