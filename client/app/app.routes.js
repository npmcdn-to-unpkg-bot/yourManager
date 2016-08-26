import { provideRouter } from '@angular/router';
import { LoginRoutes } from './login/login.route';
import { AdminRoutes } from './+admin/admin.route';
import { DashboardRoutes } from './dashboard/dashboard.route';
import { HomeRoutes } from './home/home.route';
const routes = [
    ...HomeRoutes,
    ...AdminRoutes,
    ...DashboardRoutes,
    ...LoginRoutes,
];
export const appRouterProviders = [
    provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map