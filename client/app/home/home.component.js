var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
export let HomeComponent = class {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
        this.fullpath = 'assets/images/your.jpg';
    }
};
HomeComponent = __decorate([
    Component({
        //moduleId:module.id,
        selector: 'ym-home',
        templateUrl: 'home.component.html',
        directives: [ROUTER_DIRECTIVES, HeaderComponent]
    }), 
    __metadata('design:paramtypes', [Router])
], HomeComponent);
//# sourceMappingURL=home.component.js.map