import { Routes, RouterModule } from '@angular/router';
import {LoggedInGuard} from "./logged-in.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule',
    canActivate: [LoggedInGuard]
  },
  {
    path: 'admin',
    loadChildren: 'app/+admin/admin.module#AdminModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'signup',
    loadChildren: 'app/signup/signup.module#SignupModule'
  }
];
export const routing = RouterModule.forRoot(routes);

