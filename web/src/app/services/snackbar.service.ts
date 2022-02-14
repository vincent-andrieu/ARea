import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    constructor(private _matSnackBar: MatSnackBar) {}

    public open(message: string): MatSnackBarRef<TextOnlySnackBar> {
        return this._matSnackBar.open(message);
    }

    public openError(error?: HttpErrorResponse): void {
        console.error(error);
        let message = "Server error";

        if (error?.status === 404)
            message = "Not found";
        else if (typeof error?.error === 'string')
            message = error.error;
        else if (typeof error?.error?.message === 'string')
            message = error.error.message;
        else if (typeof error?.error?.text === 'string')
            message = error.error.text;
        this._matSnackBar.open(message, undefined, { panelClass: 'snackbar-error' });
    }

    public openCustomError(message: string): MatSnackBarRef<TextOnlySnackBar> {
        return this._matSnackBar.open(message, undefined, { panelClass: 'snackbar-error' });
    }
}