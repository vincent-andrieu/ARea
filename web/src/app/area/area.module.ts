import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AReaListComponent } from './list/list.component';
import { AReaEditModalComponent } from './edit-modal/edit-modal.component';
import { AReaSettingsComponent } from './settings/settings.component';
import { AreaWidgetComponent } from './list/area-widget/area-widget.component';

@NgModule({
    declarations: [
        AReaListComponent,
        AReaEditModalComponent,
        AReaSettingsComponent,
        AreaWidgetComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,

        MatRippleModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatProgressSpinnerModule
    ]
})
export class AReaModule {}