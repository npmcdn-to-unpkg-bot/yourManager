import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate() {
    console.log("calledddddddd :|")

    if(this.loginService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}