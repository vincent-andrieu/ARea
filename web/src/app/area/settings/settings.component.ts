import { Component } from '@angular/core';

import { AuthService, ServiceData } from "@services/auth.service";

class UserServiceData implements ServiceData {
    iconSvgPath: string;
    label: string;
    name: string;
    redirect: string;
    isConnected: boolean;

    constructor(serviceData: ServiceData, userOAuth: boolean) {
        this.iconSvgPath = serviceData.iconSvgPath;
        this.label = serviceData.label;
        this.name = serviceData.name;
        this.redirect = serviceData.redirect;

        this.isConnected = userOAuth;
    }
}

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class AReaSettingsComponent {
    constructor(private _authService: AuthService) {}

    public get services(): Array<UserServiceData> {
        if (!this._authService.user.oauth)
            return [];
        return Object.entries(this._authService.user.oauth).map(([oauthName, oauthValue]) => {
            const serviceData = this._authService.apps.find((app) => app.name === oauthName[0]);

            if (!serviceData)
                throw "Fail to find oauth app";
            return new UserServiceData(serviceData, oauthValue);
        });
    }

    public redirectToServiceAuth(service: UserServiceData): void {
        if (service.isConnected)
            this._authService.disconnectFromService(service.name);
        else
            this._authService.loginToService(service.redirect);
    }

    public logout(): void {
        this._authService.logout();
    }
}