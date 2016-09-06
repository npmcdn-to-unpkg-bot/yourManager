import { Injectable } from '@angular/core';

import {User} from '../shared/model/user';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LoginService {
  loginUrl = '/api/users/signin';
  public loggedIn: boolean = false;

  constructor(private http: Http) {}

  login(user: User) {
    console.log(this.loggedIn)
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.loginUrl, JSON.stringify(user), {headers: headers})
      .toPromise()
      .then(res => this.extractData(res))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  private extractData(res: Response) {
    console.log("======" + this.loggedIn)
    let body = res.json();
    if(JSON.stringify(body) != '{}'){
      localStorage.setItem('user', JSON.stringify(body));
      this.loggedIn = true;
      console.log("++++++" + this.loggedIn)
      return true
    }
  }

  isLoggedIn() {
    console.log("-------------"+this.loggedIn);
    return this.loggedIn;
  }

}
