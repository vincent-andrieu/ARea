import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from "@angular-material-components/datetime-picker";

import { MatRippleModule } from "@angular/material/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from '@angular/material/datepicker';

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
        RouterModule,
        ReactiveFormsModule,
        FormsModule,

        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,

        MatRippleModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule
    ]
})
export class AReaModule {}