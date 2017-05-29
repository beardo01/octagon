import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the RegisterUser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RegisterUser {

  constructor(public http: Http) {}
/*
 "username" : "oliver",
 "email"	: "oliver@gmail.com",
 "password" : "password",
 "rpassword": "password",
 "ip"		: "127.0.0.1"


{
  "success": true,
  "data": {
    "client_key": "47bUWIYJe3BgnpRik7gz",
    "colours": {
      "colour_one": "red",
      "colour_three": "blue",
      "colour_two": "green"
    },
    "labels": {
      "label_one": "Meeting",
      "label_three": "Event",
      "label_two": "Assignment"
    }
  }
}
*/
  registerUser(userObject) {
    // post to server and set new colour strings
    let headers: Headers =  new Headers();
    headers.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    headers.append('Content-Type', 'application/json');
    let userData = {
      'username': userObject.name,
      'email': userObject.email,
      'password': userObject.password,
      'rpassword': userObject.rpassword,
      'ip': userObject.ip
    };
    return this.http.post('https://api.simpalapps.com/driver/create/user', JSON.stringify(userData), {headers: headers})
      .map(res => {
        var response = res.json();
        console.log("RESPONSE FROM register USER POST");
        console.log(response);
        return response;
        //this.validated(response)
      })
  }


}
