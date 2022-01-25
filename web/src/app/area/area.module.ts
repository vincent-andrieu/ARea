import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AReaListComponent } from './list/list.component';
import { AReaEditModalComponent } from './edit-modal/edit-modal.component';
import { AReaSettingsComponent } from './settings/settings.component';

@NgModule({
    declarations: [
        AReaListComponent,
        AReaEditModalComponent,
        AReaSettingsComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AReaModule {}