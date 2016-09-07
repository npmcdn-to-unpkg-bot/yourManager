import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';


/* App root*/
import {AppComponent} from './app.component';

/*
 @Feature Modules
 **/
import {routing} from './app.routes';

import {LoginModule} from './login/login.module';
import {AdminModule} from './+admin/admin.module';
import {HomeModule} from './home/home.module';
import {SignupModule} from "./signup/signup.module";
import {HeaderComponent} from "./shared/header/header.component";
import {LoginComponent} from "./login/login.component";
import {LoginGuard} from "./login.guard";
import {LoggedInGuard} from "./logged-in.guard";


@NgModule({
  imports: [
    BrowserModule ,
    routing,
    LoginModule
  ],
  declarations: [ AppComponent, HeaderComponent ],
  bootstrap: [ AppComponent ],
  providers: [LoginGuard, LoggedInGuard]
})
export class AppModule { }
