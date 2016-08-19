import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {AdminService} from './admin.service';
import {logistics} from '../shared/model/logistics';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
    moduleId:module.id,
    selector: 'ym-admin',
    template:'<ym-header-shared></ym-header-shared><div class="container" style="padding-top: 70px;"><div class="title"></div><div class="panel-body" style="overflow-x:auto;"><table *ngIf="allocatedAssetsList"><tr><th>EmployeeId</th><th>Employee Name</th><th>Device Name</th><th>Model Number</th><th>Service Tag</th><th>Device Code</th><th>Serial Number</th><th>Date Of Issue</th><th>Warranty Period</th><th>specification</th><th>shipping Date</th><th>Purchase Date</th><th>Warranty End Date</th><th>Last Maintenance Date</th></tr><tr *ngFor="let asset of allocatedAssetsList"><td>{{asset.empId}}</td><td>{{asset.empName}}</td><td>{{asset.deviceName}}</td><td>{{asset.modelNo}}</td><td>{{asset.serviceTag}}</td><td>{{asset.deviceCode}}</td><td>{{asset.serialNo}}</td><td>{{asset.DOI}}</td><td>{{asset.warrantyPeriod}}</td><td>{{asset.specs}}</td><td>{{asset.shippingDate}}</td><td>{{asset.purchaseDate}}</td><td>{{asset.warrantyEndDate}}</td><td>{{asset.lastMaintenanceDate}}</td></tr></table></div></div>',
    styleUrls:['admin.component.css'],
    providers:[AdminService],
    directives:[HeaderComponent]
})

export class AdminComponent implements OnInit, OnDestroy {
   @Input() public allocatedAssetsList: logistics[];
    private sub: any;
    mode = 'Observable';
    public errorMessage = '';
    public selectedId: string;
    constructor(private adminService: AdminService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {

        this.sub = this.route
            .params
            .subscribe(params => {
                this.selectedId = params['id'];
                this.listByEmpId(this.selectedId);

            });

    }

    listByEmpId(empId:string) {

        this.adminService.getAllocatedAssets(empId).subscribe(
            res => {
                this.allocatedAssetsList = res;
            },
            error =>  this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


}
