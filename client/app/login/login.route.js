import { LoginComponent } from './login.component';
export var LoginRoutes = [
    {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
];
//# sourceMappingURL=login.route.js.map