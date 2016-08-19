import {Component, OnInit} from '@angular/core';
import { Router,ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
    moduleId:module.id,
    selector: 'ym-home',
    template:'<ym-header-shared></ym-header-shared><div class="container" style="padding-top: 70px;"><div class="content"><span><h1>Welcome to Your manager Application...</h1><p>This application is basically the assets management system. Which manages you\'re assets automatically. Thanxx...</p></span><br></div></div><div><img style="width:100%; height:60%" [src]="fullpath"></div>',
    directives:[ROUTER_DIRECTIVES, HeaderComponent]
})

export class HomeComponent implements OnInit {

    constructor(private router: Router) {}
    public fullpath:string;

    ngOnInit() {
        this.fullpath = 'assets/images/your.jpg';
    }

}
