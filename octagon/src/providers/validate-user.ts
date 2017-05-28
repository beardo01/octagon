import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ValidateUser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ValidateUser {
  clientKey: string;
  valid: boolean;

  constructor(public http: Http) { }

  loginUser(userObject) {
    // post to server and set new colour strings
    let headers: Headers =  new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let userData = {
      'id': userObject.id,
      'password': userObject.password,
      'ip': '192.255.255.255'/*userObject.ip*/
    };
    return this.http.post('https://api.simpalapps.com/driver/get/user', JSON.stringify(userData), {headers: headers})
      .map(res => {
        var response = res.json();
        this.validated(response)
      })
  }

  validated(response) {
    if (!response.success) {
      this.valid = false;
    } else {
      this.valid = true;
      this.clientKey = response.data.client_key;
    }
  } 

  getClientKey() {
    return this.clientKey;
  }
  getValid() {
    return this.valid;
  }

}