import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import ARea from "@classes/area.class";
import Action from "@classes/action.class";
import { AreaService } from "@services/area.service";

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss']
})
export class AReaEditModalComponent {
    public form: FormGroup = new FormGroup({
        // service: new FormControl((this.area?.action as Action).label)
    });

    constructor(
        private _matDialogRef: MatDialogRef<AReaEditModalComponent, ARea | undefined>,
        @Inject(MAT_DIALOG_DATA) public area: ARea | undefined,
        private _areaService: AreaService
    ) {}

    public get isEdit(): boolean {
        return !!this.area;
    }

    public async submit(): Promise<void> {
        // const area: ARea = Object.assign(this.area, {

        // });

        // const result: ARea = await (this.area ? this._areaService.add(area) : this._areaService.edit(area));

        // this._matDialogRef.close(result);
    }
}