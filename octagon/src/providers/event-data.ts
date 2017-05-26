import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventData {

  constructor(public http: Http) {
    
  }
  requestEventData(from, to) {
    let opt: RequestOptions
    let myHeaders: Headers = new Headers();
    myHeaders.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    myHeaders.append('Content-Type', 'application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })  
    // Make get request to API and get current values for colour strings
    return this.http.get('http://api.simpalapps.com/driver/get/events', opt).map(res => 
      {
      var data = res.json().message;
      console.log("Data recieved from requestEventData:")
      console.log(data);
      //this.colours.push(data.colours.colour_one);
      },
      error => {
        console.log(error)
      });
    }

}
