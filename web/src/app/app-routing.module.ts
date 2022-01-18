import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServerGuard } from '@guards/server.guard';
import { AuthGuard } from '@guards/auth.guard';
import { LoginGuard } from '@guards/login.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AReaListComponent } from './area/list/list.component';
import { AReaEditModalComponent } from './area/edit-modal/edit-modal.component';
import { AReaSettingsComponent } from './area/settings/settings.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [ServerGuard] },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
    {
        path: 'areas',
        canActivate: [AuthGuard],
        component: AReaListComponent,
        children: [
            { path: ':areaId', component: AReaEditModalComponent }
        ]
    },
    { path: 'settings', component: AReaSettingsComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}