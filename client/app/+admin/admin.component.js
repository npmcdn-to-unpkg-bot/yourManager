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
var AdminComponent = (function () {
    function AdminComponent(adminService, router, route) {
        this.adminService = adminService;
        this.router = router;
        this.route = route;
        this.mode = 'Observable';
        this.errorMessage = '';
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .params
            .subscribe(function (params) {
            _this.selectedId = params['id'];
            _this.listByEmpId(_this.selectedId);
        });
    };
    AdminComponent.prototype.listByEmpId = function (empId) {
        var _this = this;
        this.adminService.getAllocatedAssets(empId).subscribe(function (res) {
            _this.allocatedAssetsList = res;
        }, function (error) { return _this.errorMessage = error; });
    };
    AdminComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], AdminComponent.prototype, "allocatedAssetsList", void 0);
    AdminComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'ym-admin',
            templateUrl: 'admin.component.html',
            styleUrls: ['admin.component.css'],
            providers: [AdminService],
            directives: [HeaderComponent]
        }), 
        __metadata('design:paramtypes', [AdminService, Router, ActivatedRoute])
    ], AdminComponent);
    return AdminComponent;
})();
AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map