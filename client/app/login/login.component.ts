import { Component, Input } from '@angular/core';
import { User } from '../shared/model/user';
import {LoginService} from './login.service';
import { Router } from '@angular/router';

@Component({
    moduleId:module.id,
    selector: 'ym-login',
    templateUrl: 'login.component.html',
    styleUrls:['login.component.css'],

})


export class LoginComponent {
    public errorMsg = '';
    @Input() user:User;
    user = {};

    constructor(private loginService: LoginService, private router: Router) {}

    login() {
        this.loginService.login(this.user)
        .subscribe(data => {
            if(data){
                this.router.navigate(['home'])
            } else {
                this.errorMsg = 'Failed to login...';
            }
        },
        error => alert(error))
    }

    goToSignup() {
        this.router.navigate(['signup']);
    }

}
