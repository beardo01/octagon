import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ValidateUser {
  clientKey: string;
  valid: boolean;

  constructor(public http: Http) { }

  loginUser(userObject) {
    // post to server and set new colour strings
    let headers: Headers =  new Headers();
    headers.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    headers.append('Content-Type', 'application/json');
    let userData = {
      'id': userObject.id,
      'password': userObject.password,
      'ip': userObject.ip
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