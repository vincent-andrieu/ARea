import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { environment } from "@environment";
import { SnackbarService } from "app/services/snackbar.service";
import { ValidatorsService } from "app/services/validators.service";
import { CookieService } from "ngx-cookie";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    public form: FormGroup = new FormGroup({
        serverIp: new FormControl(this._cookieService.get(environment.cookiesKey.serverIp), [Validators.required, this._validatorsService.isValidUrl])
    });

    constructor(
        private _cookieService: CookieService,
        private _validatorsService: ValidatorsService,
        private _snackbarService: SnackbarService
    ) {}

    public submitForm(): void {
        if (this.form.pristine || this.form.invalid)
            return;
        const serverIp: string | undefined = this.form.get('serverIp')?.value;

        if (!serverIp) {
            this._snackbarService.openCustomError("Invalid server IP");
            return;
        }

        this._cookieService.put(environment.cookiesKey.serverIp, serverIp, {
            sameSite: true
        });
    }

}