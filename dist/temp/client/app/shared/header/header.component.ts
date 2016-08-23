import {Component, OnInit} from '@angular/core';
import { Router,ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    //moduleId:module.id,
    selector: 'ym-header-shared',
    template:'<nav class="navbar navbar-inverse navbar-fixed-top"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#">Your Manager</a></div><ul class="nav navbar-nav pull-right" *ngIf="show"><li><a routerLink="/home" routerLinkActive="active">Home</a></li><li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li><li><a (click)="logout()">logout</a></li></ul></div></nav>',
    directives:[ROUTER_DIRECTIVES],
    styles: [``]
})

export class HeaderComponent implements OnInit {

    show: boolean = true;
    constructor(private router: Router) {};

    ngOnInit() {
        if (localStorage.getItem('user') === null) {
            this.show = false;
            this.router.navigate(['/login']);
        }
    }

    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }


}
