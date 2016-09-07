import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  currentUrl = this.router.url
  canActivate() {

    if(localStorage.getItem('user') != null){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}