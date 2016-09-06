import { Component,Injectable } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
    selector: 'my-app',
    template: `
     <ym-header-shared></ym-header-shared>
     <router-outlet></router-outlet>
    `
})

@Injectable()
export class AppComponent {
}
