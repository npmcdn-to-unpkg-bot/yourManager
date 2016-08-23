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
export let LoginComponent = class LoginComponent {
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
        template: '<ym-header-shared></ym-header-shared><div class="container"><div class="title">Login</div><div class="panel-body login-panel"><div class="row"><div class="input-field col s12"><input [(ngModel)]="user.email" class="input-box validate" id="email" type="email"> <label for="email">Email</label></div></div><div class="row"><div class="input-field col s12"><input [(ngModel)]="user.password" class="input-box validate" id="password" type="password"> <label for="password">Password</label></div></div><span>{{errorMsg}}</span> <button (click)="login(user)" class="btn waves-effect waves-light login-button" type="submit" name="action">Login</button></div></div>',
        styles: [`.container {  width: 600px;  height: 350px;  margin: 100px auto;  box-shadow: 2px 3px 15px -8px; }.content {  height: 250px;  text-align: center;  padding: 70px; }.content span {  margin-bottom: 30px; }.input-box {  padding: 4px;  margin-bottom: 5%; }.login-panel {  margin-top: 10%;  margin-left: 29%; }.login-button {  background-color: #26A69A;  color: white;  font-size: 19px; }.title {  width: 100%;  height: 90px;  font-size: 28px;  color: white;  padding: 0px;  background: #26A69A; }.panel-body {  padding: 15px; }.panel-body span {  color: red; }.panel-body button {  float: right; }/*---------------------------------------------------------------------------*/.footer-basic-centered {  background-color: #292c2f;  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);  box-sizing: border-box;  width: 100%;  text-align: center;  font: normal 18px sans-serif;  padding: 45px;  margin-top: 80px; }.footer-basic-centered .footer-company-motto {  color: #8d9093;  font-size: 24px;  margin: 0; }.footer-basic-centered .footer-company-name {  color: #8f9296;  font-size: 14px;  margin: 0; }.footer-basic-centered .footer-links {  list-style: none;  font-weight: bold;  color: #ffffff;  padding: 35px 0 23px;  margin: 0; }.footer-basic-centered .footer-links a {  display: inline-block;  text-decoration: none;  color: inherit; }/* If you don't want the footer to be responsive, remove these media queries */@media (max-width: 600px) {  .footer-basic-centered {    padding: 35px; }  .footer-basic-centered .footer-company-motto {    font-size: 18px; }  .footer-basic-centered .footer-company-name {    font-size: 12px; }  .footer-basic-centered .footer-links {    font-size: 14px;    padding: 25px 0 20px; }  .footer-basic-centered .footer-links a {    line-height: 1.8; } }`],
        providers: [LoginService],
        directives: [HeaderComponent]
    }), 
    __metadata('design:paramtypes', [LoginService, Router])
], LoginComponent);
