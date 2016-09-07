import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId:module.id,
    selector: 'ym-home',
    templateUrl:'home.component.html',
})

export class HomeComponent implements OnInit {

    constructor(private router: Router) {}
    public fullpath:string;
    show: boolean;

    ngOnInit() {
        this.show = true;
        this.fullpath = 'assets/images/your.jpg';
    }

}
