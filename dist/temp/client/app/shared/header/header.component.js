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
var router_1 = require('@angular/router');
var HeaderComponent = (function () {
    function HeaderComponent(router) {
        this.router = router;
        this.show = true;
    }
    ;
    HeaderComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('user') === null) {
            this.show = false;
            this.router.navigate(['/login']);
        }
    };
    HeaderComponent.prototype.logout = function () {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ym-header-shared',
            template: '<nav class="navbar navbar-inverse navbar-fixed-top"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#">Your Manager</a></div><ul class="nav navbar-nav pull-right" *ngIf="show"><li><a routerLink="/home" routerLinkActive="active">Home</a></li><li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li><li><a (click)="logout()">logout</a></li></ul></div></nav>',
            directives: [router_1.ROUTER_DIRECTIVES],
            styles: [""]
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
