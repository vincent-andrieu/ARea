import { Component } from '@angular/core';
import { AuthService } from "@services/auth.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class AReaSettingsComponent {
    constructor(private _authService: AuthService) {}

    public get services() {
        return this._authService.apps;
    }

    public redirectToServiceAuth(redirectRoute: string): void {
        this._authService.redirectToApp(redirectRoute);
    }

    public logout(): void {
        this._authService.logout();
    }
}