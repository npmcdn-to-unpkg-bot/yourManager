import { LoginComponent } from './login.component';
export const LoginRoutes = [
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