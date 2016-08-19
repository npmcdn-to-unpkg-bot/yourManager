"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var user_1 = require('.././user/user');
var login_service_1 = require('./login.service');
var router_1 = require('@angular/router');
var header_component_1 = require('../shared/header/header.component');
var LoginComponent = (function () {
    function LoginComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.errorMsg = '';
        this.user = {};
    }
    LoginComponent.prototype.login = function (user) {
        this.selectedUser = user;
        if (!this.loginService.login(this.selectedUser)) {
            this.errorMsg = 'Failed to login......';
        }
        else {
            this.router.navigate(['/home']);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_1.User)
    ], LoginComponent.prototype, "selectedUser", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ym-login',
            template: '<ym-header-shared></ym-header-shared><div class="container"><div class="title">Login</div><div class="panel-body login-panel"><div class="row"><div class="input-field col s12"><input [(ngModel)]="user.email" class="input-box validate" id="email" type="email"> <label for="email">Email</label></div></div><div class="row"><div class="input-field col s12"><input [(ngModel)]="user.password" class="input-box validate" id="password" type="password"> <label for="password">Password</label></div></div><span>{{errorMsg}}</span> <button (click)="login(user)" class="btn waves-effect waves-light login-button" type="submit" name="action">Login</button></div></div>',
            styleUrls: ['login.component.css'],
            providers: [login_service_1.LoginService],
            directives: [header_component_1.HeaderComponent]
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=login.component.js.map
