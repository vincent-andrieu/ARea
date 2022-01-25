import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServerService } from "app/services/server.service";
import { SnackbarService } from "app/services/snackbar.service";
import { ValidatorsService } from "app/services/validators.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    public form: FormGroup = new FormGroup({
        serverIp: new FormControl(this._serverService.getHost(), [Validators.required, this._validatorsService.isValidUrl])
    });
    public isLoading = false;

    constructor(
        private _router: Router,
        private _validatorsService: ValidatorsService,
        private _snackbarService: SnackbarService,
        private _serverService: ServerService
    ) {}

    public async submitForm(): Promise<void> {
        if (this.form.invalid)
            return;
        const serverIp: string | undefined = this.form.get('serverIp')?.value;

        if (!serverIp) {
            this._snackbarService.openCustomError("Invalid server IP");
            return;
        }

        this.isLoading = true;
        this._serverService.setHost(serverIp)
            .then(() => this._router.navigateByUrl('login'))
            .catch(() => this._snackbarService.openCustomError('Server unreachable'))
            .finally(() => this.isLoading = false);
    }

}