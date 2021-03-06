import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServiceType } from "@classes/model/ServiceType";

import { AuthService, ServiceData } from "@services/auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    public form: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", Validators.required)
    });
    public isLoading = false;

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) {}

    public get appsLoginButton(): ReadonlyArray<ServiceData> {
        return this._authService.apps.filter((app) => app.name !== ServiceType.DISCORD);
    }

    public submitForm(): void {
        if (this.form.invalid || this.form.pristine)
            return;

        this.isLoading = true;
        this._authService.register(this.form.get('email')?.value, this.form.get('password')?.value)
            .then(() => this._router.navigateByUrl('/areas', { replaceUrl: true }))
            .finally(() => this.isLoading = false);
    }

    public redirectToAppAuth(service: ServiceType): void {
        this._authService.loginToService(service);
    }
}