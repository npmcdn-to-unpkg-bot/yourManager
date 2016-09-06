import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {LoggedInGuard} from "../logged-in.guard";

const adminRoutes: Routes = [

    {
        path: ':id',
        component: AdminComponent,
        canActive: [ LoggedInGuard ]
    }
];
export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);


