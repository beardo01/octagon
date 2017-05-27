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

  events: string [][] = [];

  constructor(public http: Http) {
    
  }
  requestEventData() {

    let opt: RequestOptions
    let myHeaders: Headers = new Headers();
    myHeaders.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    myHeaders.append('Content-Type', 'application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })  
    // Make get request to API and get current values for colour strings
    return this.http.get('https://api.simpalapps.com/driver/get/events', opt).map(res => 
      {
      var data = res.json().message;
      // Loop through each event array in JSON object and add to an array
      this.events = [];
      data.forEach(event => {
        this.events.push(event);
      });
      //console.log("CALLED REQUEST EVENT DATA. DUMPING DATA")
      //console.log(this.events)
      //this.colours.push(data.colours.colour_one);
      },
      error => {
        console.log(error)
      });
    }

    getEvents() {
      return this.events;
    }

}
