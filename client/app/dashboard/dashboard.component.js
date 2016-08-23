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
import { SearchService } from './dashboard.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
//import {LoginService} from '.././login/login.service'
var DashboardComponent = (function () {
    function DashboardComponent(searchService, router, route) {
        this.searchService = searchService;
        this.router = router;
        this.route = route;
        this.search = { value: '' };
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.fullpath = 'assets/images/sample.png';
    };
    DashboardComponent.prototype.onSubmit = function () {
        this.listByEmpId(this.search.value);
    };
    DashboardComponent.prototype.listByEmpId = function (empId) {
        this.router.navigate(['/admin', empId]);
        //this.searchService.getAllocatedAssets(empId).subscribe(
        //    res => {
        //        this.allocatedAssetsList = res;
        //
        //
        //    },
        //    error =>  this.errorMessage = <any>error);
    };
    DashboardComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'ym-dashboard',
            providers: [SearchService],
            templateUrl: 'dashboard.component.html',
            directives: [ROUTER_DIRECTIVES, HeaderComponent]
        }), 
        __metadata('design:paramtypes', [SearchService, Router, ActivatedRoute])
    ], DashboardComponent);
    return DashboardComponent;
})();
DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map