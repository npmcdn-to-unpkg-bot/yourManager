import {Component, OnInit} from '@angular/core';
import {SearchService} from './dashboard.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

//import {LoginService} from '.././login/login.service'

@Component({
    moduleId:module.id,
    selector: 'ym-dashboard',
    providers: [SearchService],
    template:'<ym-header-shared></ym-header-shared><div class="container" style="padding-top: 70px;"><form (ngSubmit)="onSubmit()" class="col-lg-6"><div class="form-group"><input type="text" class="form-control" style="width:25%;" required [(ngModel)]="search.value" name="search" placeholder="Search.."></div><button type="submit" class="btn btn-default">Submit</button> <button type="button" class="btn btn-default" (click)="listAllAssets()">List All Assets</button></form><div class="col-sm-6"><img [src]="fullpath"></div></div>',
    directives:[ROUTER_DIRECTIVES, HeaderComponent]
})

export class DashboardComponent implements OnInit {

    search = {value:''};
    public fullpath:string;
    constructor(private searchService: SearchService,  private router: Router,  private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.fullpath = 'assets/images/sample.png';
    }



    onSubmit() {

        this.listByEmpId(this.search.value);
    }

    listByEmpId(empId:string) {

        this.router.navigate(['/admin',empId]);

        //this.searchService.getAllocatedAssets(empId).subscribe(
        //    res => {
        //        this.allocatedAssetsList = res;
        //
        //
        //    },
        //    error =>  this.errorMessage = <any>error);
    }
}