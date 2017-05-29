import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalEvents {

  events = {};
  

  constructor(public storage: Storage) {}
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
    console.log('sending events to storage', events)
    this.storage.set('events', events);
  }
  
  /**
   * Get events variables from local DB
   */
  requestLocalEvents() {
    console.log("requesting local events")
    return this.storage.get('events').then((val) => {
      this.events = val;
    })
  }
  

} // end class
