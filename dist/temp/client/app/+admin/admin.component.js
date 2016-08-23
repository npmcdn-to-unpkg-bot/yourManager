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
import { AdminService } from './admin.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
export let AdminComponent = class AdminComponent {
    constructor(adminService, router, route) {
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this.mode = 'Observable';
        this.errorMessage = '';
    }
    ngOnInit() {
        this.sub = this.route
            .params
            .subscribe(params => {
            this.selectedId = params['id'];
            this.listByEmpId(this.selectedId);
        });
    }
    listByEmpId(empId) {
        this.adminService.getAllocatedAssets(empId).subscribe(res => {
            this.allocatedAssetsList = res;
        }, error => this.errorMessage = error);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
};
__decorate([
    Input(), 
    __metadata('design:type', Array)
], AdminComponent.prototype, "allocatedAssetsList", void 0);
AdminComponent = __decorate([
    Component({
        //moduleId:module.id,
        selector: 'ym-admin',
        template: '<ym-header-shared></ym-header-shared><div class="container" style="padding-top: 70px;"><div class="title"></div><div class="panel-body" style="overflow-x:auto;"><table *ngIf="allocatedAssetsList"><tr><th>EmployeeId</th><th>Employee Name</th><th>Device Name</th><th>Model Number</th><th>Service Tag</th><th>Device Code</th><th>Serial Number</th><th>Date Of Issue</th><th>Warranty Period</th><th>specification</th><th>shipping Date</th><th>Purchase Date</th><th>Warranty End Date</th><th>Last Maintenance Date</th></tr><tr *ngFor="let asset of allocatedAssetsList"><td>{{asset.empId}}</td><td>{{asset.empName}}</td><td>{{asset.deviceName}}</td><td>{{asset.modelNo}}</td><td>{{asset.serviceTag}}</td><td>{{asset.deviceCode}}</td><td>{{asset.serialNo}}</td><td>{{asset.DOI}}</td><td>{{asset.warrantyPeriod}}</td><td>{{asset.specs}}</td><td>{{asset.shippingDate}}</td><td>{{asset.purchaseDate}}</td><td>{{asset.warrantyEndDate}}</td><td>{{asset.lastMaintenanceDate}}</td></tr></table></div></div>',
        styles: [`td, th {  border: 1px solid #dddddd;  text-align: left;  padding: 8px; }tr:nth-child(even) {  background-color: #dddddd; }table {  border-collapse: collapse;  border-spacing: 0;  width: 100%;  border: 1px solid #ddd; }`],
        providers: [AdminService],
        directives: [HeaderComponent]
    }), 
    __metadata('design:paramtypes', [AdminService, Router, ActivatedRoute])
], AdminComponent);
