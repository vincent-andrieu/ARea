import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "@environment";
import { SnackbarService } from "app/services/snackbar.service";
import { ValidatorsService } from "app/services/validators.service";
import { CookieService } from "ngx-cookie";
import { catchError, of } from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    public form: FormGroup = new FormGroup({
        serverIp: new FormControl(this._cookieService.get(environment.cookiesKey.serverIp), [Validators.required, this._validatorsService.isValidUrl])
    });
    public isLoading = false;

    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _cookieService: CookieService,
        private _validatorsService: ValidatorsService,
        private _snackbarService: SnackbarService
    ) {}

    public submitForm(): void {
        if (this.form.invalid)
            return;
        const serverIp: string | undefined = this.form.get('serverIp')?.value;

        if (!serverIp) {
            this._snackbarService.openCustomError("Invalid server IP");
            return;
        }

        this.isLoading = true;
        this._httpClient.get(serverIp, { observe: 'response' })
            .pipe(catchError((err: HttpErrorResponse) => of(err)))
            .subscribe((response) => {
                if (response.status !== 0) {
                    this._cookieService.remove(environment.cookiesKey.jwt);
                    this._cookieService.put(environment.cookiesKey.serverIp, serverIp, {
                        sameSite: true
                    });

                    this._router.navigateByUrl('login');
                } else
                    this._snackbarService.openCustomError('Server unreachable');

                this.isLoading = false;
            });
    }

}