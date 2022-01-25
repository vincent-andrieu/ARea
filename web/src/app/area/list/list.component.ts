import { Component } from '@angular/core';

import ARea from "@classes/area.class";
import { AreaService } from "@services/area.service";

@Component({
    selector: 'app-area-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class AReaListComponent {
    public areas: Array<ARea> = [];
    public isLoading = false;

    constructor(areaService: AreaService) {
        this.isLoading = true;
        areaService.getAreas()
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
}