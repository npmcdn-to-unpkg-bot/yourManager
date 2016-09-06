import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardComponent }    from './dashboard.component';
import {LoggedInGuard} from "../logged-in.guard";

const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActive: [ LoggedInGuard ]
    }
];
export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);