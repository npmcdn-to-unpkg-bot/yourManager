import { ModuleWithProviders } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardComponent }    from './dashboard.component';
import {LoginGuard} from "../login.guard";

const dashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActive: [ LoginGuard ]
    }
];
export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);