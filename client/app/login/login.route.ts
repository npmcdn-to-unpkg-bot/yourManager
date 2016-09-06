import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent }    from './login.component';
import { LoggedInGuard }    from './../logged-in.guard.ts';

const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
    ,
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
export const loginRouting: ModuleWithProviders = RouterModule.forChild(loginRoutes);
