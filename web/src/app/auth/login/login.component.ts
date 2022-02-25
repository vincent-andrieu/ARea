import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";

import { AuthService, ServiceData } from "@services/auth.service";
import { environment } from "@environment";
import { ServiceType } from "@classes/model/ServiceType";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public form: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", Validators.required)
    });
    public isLoading = false;

    constructor(
        private _router: Router,
        private _cookieService: CookieService,
        private _authService: AuthService
    ) {}

    public get appsLoginButton(): ReadonlyArray<ServiceData> {
        return this._authService.apps.filter((app) => app.name !== ServiceType.DISCORD);
    }

    public submitForm(): void {
        if (this.form.invalid || this.form.pristine)
            return;

        this.isLoading = true;
        this._authService.login(this.form.get('email')?.value, this.form.get('password')?.value)
            .then(() => this._router.navigateByUrl('/areas', { replaceUrl: true }))
            .finally(() => this.isLoading = false);
    }

    public async redirectToAppAuth(redirectRoute: string): Promise<void> {
        if (this._cookieService.hasKey(environment.cookies.jwt.name))
            await this._authService.logout();
        this._authService.loginToService(redirectRoute);
    }

}