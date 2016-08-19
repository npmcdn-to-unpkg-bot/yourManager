import { Component, Input } from '@angular/core';
import { User } from '.././user/user';
import {LoginService} from './login.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
    moduleId:module.id,
    selector: 'ym-login',
    template:'<ym-header-shared></ym-header-shared><div class="container"><div class="title">Login</div><div class="panel-body login-panel"><div class="row"><div class="input-field col s12"><input [(ngModel)]="user.email" class="input-box validate" id="email" type="email"> <label for="email">Email</label></div></div><div class="row"><div class="input-field col s12"><input [(ngModel)]="user.password" class="input-box validate" id="password" type="password"> <label for="password">Password</label></div></div><span>{{errorMsg}}</span> <button (click)="login(user)" class="btn waves-effect waves-light login-button" type="submit" name="action">Login</button></div></div>',
    styleUrls:['login.component.css'],
    providers:[LoginService],
    directives:[HeaderComponent]
})


export class LoginComponent {
    public errorMsg = '';
    @Input() selectedUser:User;
    user = {};

    constructor(private loginService: LoginService, private router: Router) {}

    login(user:User) {
        this.selectedUser = user;

        if(!this.loginService.login(this.selectedUser)) {
            this.errorMsg = 'Failed to login......';
        } else {
                this.router.navigate(['/home']);
        }
    }
}
