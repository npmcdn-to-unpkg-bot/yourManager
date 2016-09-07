import { RouterConfig, Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './home.component';
import {LoginGuard} from "../login.guard";

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActive: [ LoginGuard ]
    }
];

export const homeRouting = RouterModule.forChild(homeRoutes)