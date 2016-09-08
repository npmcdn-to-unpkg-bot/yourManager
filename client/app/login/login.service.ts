import { Injectable } from '@angular/core';

import {User} from '../shared/model/user';
import { Headers, Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LoginService {
  loginUrl = '/api/users/signin';

  constructor(private http: Http) {}

  login(user: User): Observable<Boolean> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.loginUrl, JSON.stringify(user), {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
    let body = res.json();
    if(JSON.stringify(body) != '{}'){
      localStorage.setItem('user', JSON.stringify(body));
      return true
    } else {
      return false
    }
  }

}
