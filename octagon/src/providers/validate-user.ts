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
  

  constructor(public http: Http) { }

  requestColoursAndLabels() {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers();
    myHeaders.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    myHeaders.append('Content-Type', 'application/json');

    opt = new RequestOptions({
      headers: myHeaders
    })  
    // Make get request to API and get current values for colour strings
    return this.http.post('https://api.simpalapps.com/driver/get/settings', opt).map(res => 
      {
      //   var data = res.json().message;
      // this.colours[0] = data.colours.colour_one;
      // this.colours[1] = data.colours.colour_two;
      // this.colours[2] = data.colours.colour_three;

      // this.labels[0] = data.labels.label_one;
      // this.labels[1] = data.labels.label_two;
      // this.labels[2] = data.labels.label_three;
      },
      error => {
        console.log(error)
      });
    }
/*
{
  "status": true,
  "message": "Successful login.",
  "data": {
    "activated": 0,
    "client_key": "D2IiwP9nUDRpg8C41YUx",
    "email": "oliver@gmail.com",
    "id": 9,
    "last_ip": "127.0.0.1",
    "ones": 0,
    "threes": 0,
    "twos": 0,
    "username": "oliver"
  }
}
*/

  loginUser(userObject) {
    console.log(userObject);
    console.log('userObject');
    console.log(userObject.username);
    // post to server and set new colour strings
    let headers: Headers =  new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let userData = {
      'username': userObject.username,
      'password': userObject.password,
      'ip': '192.255.255.255'/*userObject.ip*/
    };
    console.log(JSON.stringify(userData));
    this.http.post('https://api.simpalapps.com/driver/get/user', JSON.stringify(userData), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      });
  }

}