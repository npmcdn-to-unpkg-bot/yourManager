"use strict";
var router_1 = require('@angular/router');
var login_route_1 = require('./login/login.route');
var admin_route_1 = require('./+admin/admin.route');
var dashboard_route_1 = require('./dashboard/dashboard.route');
var home_route_1 = require('./home/home.route');
var routes = home_route_1.HomeRoutes.concat(admin_route_1.AdminRoutes, dashboard_route_1.DashboardRoutes, login_route_1.LoginRoutes);
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map