"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./login.component');
var loginRoutes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    }, {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
exports.loginRouting = router_1.RouterModule.forChild(loginRoutes);

//# sourceMappingURL=login.route.js.map
