import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { LocalEvents } from '../providers/local-events'

@Injectable()
export class EventData {

  events: string [][] = [];
  success: boolean;

  constructor(public http: Http, public localEvents: LocalEvents) {
    
  }


  requestEventData() {
    var start = moment().startOf('day').unix();
    //var end = start + 
    let headers: Headers =  new Headers();
    headers.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    headers.append('client_key', 'Ym2fv0ZxMyJrnCiwmNDi');
    headers.append('Content-Type', 'application/json');
    
    let body = {
      'from': start
    };
    // Make get request to API and get current values for colour strings
    return this.http.post('https://api.simpalapps.com/driver/get/events', JSON.stringify(body), {headers:headers})
    .map(res => res.json())
      .subscribe(data => {
        this.events = data

        this.localEvents.setLocalStorageEvents(data);
        console.log("response from server", data)
      })
  }

    getEvents() {
      return this.events;
    }

}
