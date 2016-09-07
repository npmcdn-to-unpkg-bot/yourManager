import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {LoginGuard} from "../login.guard";

const adminRoutes: Routes = [

    {
        path: ':id',
        component: AdminComponent,
        canActive: [ LoginGuard ]
    }
];
export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);


