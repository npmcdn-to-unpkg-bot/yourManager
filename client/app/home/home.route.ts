import { RouterConfig, Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './home.component';
import {LoggedInGuard} from "../logged-in.guard";

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActive: [ LoggedInGuard ]
    }
];

export const homeRouting = RouterModule.forChild(homeRoutes)