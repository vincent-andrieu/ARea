import { Component } from '@angular/core';
import { ServerService } from "@services/server.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private _serverService: ServerService) {}

    public downloadMobileApp(): void {
        this._serverService.downloadMobileApp();
    }

}