import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ColoursAndLabels } from '../providers/colours-and-labels';


@Injectable()
export class SyncData {

  public labels: string[]; 
  public colours: string[];
  constructor(public storage: Storage, public coloursAndLabels: ColoursAndLabels) {}

  /**
   * Set data in local storage to be updated when we have a connection
   */
  setSyncColours(coloursArr){
    this.storage.set('syncColours', coloursArr);
  }

  /**
   * Used for testing purposes only
   */
  clearSyncColours() {
    this.storage.remove('syncColours');
  }
  /**
   * Check to see if we have anything in storage that hasnt been push to the web
   * if we do, send it and remove from local storage
   */
  syncColours() {
    this.storage.get('syncColours').then(response => {
      // get key value pairs from ionic storage
      if(response == null) {
        return false;
      }
      if (response) {
        // we have a response that there are colours to be synced send to API
        this.coloursAndLabels.setColours(response).subscribe( res => {
          if (res.success){
            // clear the data set flag to false
            this.storage.remove('syncColours')
          } else {
          }
        })
      }  
    })
  }
  /**
   * Push array to storage as a JSON string.
   * 
   * @param labelsArr array we want stored
   */
  setSyncLabels(labelsArr) {
    this.storage.set('syncLabels', JSON.stringify(labelsArr)); 
  }
  /**
   * Used for testing purposes only
   */
  clearSyncLabels() {
    this.storage.remove('syncLabels');
  }

  /**
   * Check to see if we have anything in storage that hasnt been push to the web
   * if we do, send it and remove from local storage
   */
  syncLabels() {
    this.storage.get('syncLabels').then(response => {
      // get key value pairs from ionic storage if null we dont need to sync :)
      if(response == null) {
        return false;
      }
      if (response) {
        // we have a response that there are labels to be synced send to API
        this.coloursAndLabels.setLabels(JSON.parse(response)).subscribe( res => {
          if (res.success) {
            // clear the data set flag to false
            console.log('removing unsynced labels')
            this.storage.remove('syncLabels')
          } else {
            console.log("Failed to sync Labels");
          }
        })
      }  
    })
  }


}
