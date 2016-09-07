import { Routes, RouterModule } from '@angular/router';
import {LoginGuard} from "./login.guard";
import {LoggedInGuard} from "./logged-in.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    loadChildren: 'app/+admin/admin.module#AdminModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'signup',
    loadChildren: 'app/signup/signup.module#SignupModule',
    canActivate: [LoggedInGuard]
  }
];
export const routing = RouterModule.forRoot(routes);

