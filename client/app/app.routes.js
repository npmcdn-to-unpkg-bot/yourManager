import { provideRouter } from '@angular/router';
import { LoginRoutes } from './login/login.route';
import { AdminRoutes } from './+admin/admin.route';
import { DashboardRoutes } from './dashboard/dashboard.route';
import { HomeRoutes } from './home/home.route';
var routes = HomeRoutes.concat(AdminRoutes, DashboardRoutes, LoginRoutes);
export var appRouterProviders = [
    provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map