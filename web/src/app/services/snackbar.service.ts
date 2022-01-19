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

    public openError(error?: HttpErrorResponse): MatSnackBarRef<TextOnlySnackBar> {
        console.error(error);
        return this._matSnackBar.open(typeof error?.error?.text === 'string' ? error.error.text : "Server error", undefined, { panelClass: 'snackbar-error' });
    }

    public openCustomError(message: string): MatSnackBarRef<TextOnlySnackBar> {
        return this._matSnackBar.open(message, undefined, { panelClass: 'snackbar-error' });
    }
}