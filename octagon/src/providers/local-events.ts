import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
//import * as moment from 'moment';

@Injectable()
export class LocalEvents {

  events = "";
  
  //current: number = moment().unix();

  constructor(public storage: Storage) {
      this.requestLocalEvents();
  }
  /**
   * return value stored in providers events data field
   */
  getProviderEvents() {
    return this.events;
  }
  /**
   * Set the local storages values for each colour key
   * @param colours Array of strings containing colour names
   */
  setLocalStorageEvents(events){
    this.storage.set('events', events);
  }
  
  /**
   * Get events variables from local DB
   */
  requestLocalEvents() {
    return this.storage.get('events').then((val) => {
      this.events = val;
    })
  }
  

} // end class
