import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import ARea from "@classes/area.class";
import { AreaService } from "@services/area.service";
import { AReaEditModalComponent } from "../edit-modal/edit-modal.component";

@Component({
    selector: 'app-area-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class AReaListComponent {
    public areas: Array<ARea> = [];
    public isLoading = false;

    constructor(private _matDialog: MatDialog, private _areaService: AreaService) {
        this.isLoading = true;
        _areaService.getAll()
            .then((result) => this.areas = result)
            .finally(() => this.isLoading = false);

        // DEBUG : To remove
        this.areas = [
            {
                action: {
                    label: "MyAction",
                    cron: false
                },
                reaction: {
                    label: "MyReaction"
                }
            }
        ];
    }

    public openEditModal(area?: ARea): void {
        this._matDialog.open<AReaEditModalComponent, ARea, ARea | undefined>(AReaEditModalComponent, {
            width: "70%",
            data: area
        })
            .afterClosed().subscribe((result) => {
                if (result) {
                    this.isLoading = true;
                    this._areaService.getAll()
                        .then((result) => this.areas = result)
                        .finally(() => this.isLoading = false);
                }
            });
    }
}