import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private loginService:LoginService, private router:Router) {
  }

  canActivate() {
    if(localStorage.getItem('user') === null) {
      return true
    }
      this.router.navigate(['/home']);
    return false;
  }
}