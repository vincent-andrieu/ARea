import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServerGuard } from '@guards/server.guard';
import { AuthGuard } from '@guards/auth.guard';
import { LoginGuard } from '@guards/login.guard';
import { AppRedirectFailureGuard } from "@guards/app-redirect-failure.guard";
import { UserResolver } from "@resolvers/user.resolver";

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AReaListComponent } from './area/list/list.component';
import { AReaSettingsComponent } from './area/settings/settings.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [ServerGuard, LoginGuard],
        children: [
            { path: 'failure', component: LoginComponent, canActivate: [AppRedirectFailureGuard] }
        ]
    },
    { path: 'register', component: RegisterComponent, canActivate: [ServerGuard, LoginGuard] },
    {
        path: 'areas',
        component: AReaListComponent,
        canActivate: [ServerGuard, AuthGuard],
        resolve: {
            user: UserResolver
        } },
    {
        path: 'areas/:areaId',
        component: AReaListComponent,
        canActivate: [ServerGuard, AuthGuard],
        resolve: {
            user: UserResolver
        }
    },
    {
        path: 'settings',
        component: AReaSettingsComponent,
        canActivate: [ServerGuard, AuthGuard],
        resolve: {
            user: UserResolver
        }
    },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}