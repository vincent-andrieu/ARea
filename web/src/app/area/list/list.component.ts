import { Location } from "@angular/common";
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";

import ARea from "@classes/area.class";
import { AreaService } from "@services/area.service";
import { SnackbarService } from "@services/snackbar.service";
import { AReaEditModalComponent } from "../edit-modal/edit-modal.component";

@Component({
    selector: 'app-area-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AReaListComponent {
    public areas: Array<ARea> = [];
    public isLoading = false;

    constructor(
        activatedRoute: ActivatedRoute,
        private _location: Location,
        private _snackbarService: SnackbarService,
        private _matDialog: MatDialog,
        private _areaService: AreaService
    ) {
        const areaId: string | undefined = activatedRoute.snapshot.params["areaId"];

        this.isLoading = true;
        _areaService.getAll()
            .then((result) => this.areas = result)
            .finally(() => this.isLoading = false);

        if (areaId === 'new')
            this.openEditModal();
        else if (areaId) {
            const area = this.areas.find((area) => area._id === areaId);

            if (area)
                this.openEditModal(area);
            else
                this._snackbarService.openCustomError(`ARea ${areaId} not found`);
        }
    }

    public openEditModal(area?: ARea): void {
        const modal = this._matDialog.open<AReaEditModalComponent, ARea, ARea | undefined>(AReaEditModalComponent, {
            width: "70%",
            data: area
        });

        modal.afterOpened().subscribe(() => this._location.replaceState(`/areas/${area?._id || 'new'}`));

        modal.afterClosed().subscribe((result) => {
            this._location.replaceState('/areas');

            if (result !== undefined) {
                this.isLoading = true;
                this._areaService.getAll()
                    .then((result) => this.areas = result)
                    .finally(() => this.isLoading = false);
            }
        });
    }
}