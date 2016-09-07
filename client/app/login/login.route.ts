import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent }    from './login.component';
import {LoggedInGuard} from "../logged-in.guard";

const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedInGuard]
    }
    ,
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
        canActivate: [LoggedInGuard]
    }
];
export const loginRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);
