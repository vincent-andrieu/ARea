import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class ValidatorsService {

    /**
     * Check if the control value start with "http://" or "https://"
     */
    public isValidUrl(control: AbstractControl): ValidationErrors | null {
        const controlValue: string = control.value;

        if (controlValue && (controlValue.startsWith("http://") || controlValue.startsWith("https://")))
            return null;
        return { 'url': true };
    }

}