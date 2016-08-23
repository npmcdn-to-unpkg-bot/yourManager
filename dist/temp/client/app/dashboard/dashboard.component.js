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
export let DashboardComponent = class DashboardComponent {
    constructor(searchService, router, route) {
        this.searchService = searchService;
        this.router = router;
        this.route = route;
        this.search = { value: '' };
    }
    ngOnInit() {
        this.fullpath = 'assets/images/sample.png';
    }
    onSubmit() {
        this.listByEmpId(this.search.value);
    }
    listByEmpId(empId) {
        this.router.navigate(['/admin', empId]);
        //this.searchService.getAllocatedAssets(empId).subscribe(
        //    res => {
        //        this.allocatedAssetsList = res;
        //
        //
        //    },
        //    error =>  this.errorMessage = <any>error);
    }
};
DashboardComponent = __decorate([
    Component({
        //moduleId:module.id,
        selector: 'ym-dashboard',
        providers: [SearchService],
        template: '<ym-header-shared></ym-header-shared><div class="container" style="padding-top: 70px;"><form (ngSubmit)="onSubmit()" class="col-lg-6"><div class="form-group"><input type="text" class="form-control" style="width:25%;" required [(ngModel)]="search.value" name="search" placeholder="Search.."></div><button type="submit" class="btn btn-default">Submit</button> <button type="button" class="btn btn-default" (click)="listAllAssets()">List All Assets</button></form><div class="col-sm-6"><img [src]="fullpath"></div></div>',
        directives: [ROUTER_DIRECTIVES, HeaderComponent]
    }), 
    __metadata('design:paramtypes', [SearchService, Router, ActivatedRoute])
], DashboardComponent);
