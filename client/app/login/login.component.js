var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { User } from '.././user/user';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
export let LoginComponent = class {
    constructor(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.errorMsg = '';
        this.user = {};
    }
    login(user) {
        this.selectedUser = user;
        if (!this.loginService.login(this.selectedUser)) {
            this.errorMsg = 'Failed to login';
        }
        else {
            this.router.navigate(['/home']);
        }
    }
};
__decorate([
    Input(), 
    __metadata('design:type', User)
], LoginComponent.prototype, "selectedUser", void 0);
LoginComponent = __decorate([
    Component({
        //moduleId:module.id,
        selector: 'ym-login',
        templateUrl: 'login.component.html',
        styleUrls: ['login.component.css'],
        providers: [LoginService],
        directives: [HeaderComponent]
    }), 
    __metadata('design:paramtypes', [LoginService, Router])
], LoginComponent);
//# sourceMappingURL=login.component.js.map