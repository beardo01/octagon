import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Storage } from '../providers/user-local-storage';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserLocalStorage {
  
clientKey: string; // need to be an object
localColours: string;
localLabels: string;
events: string;

  constructor(public http: Http, public storage: Storage) {
    // when constructor is called request local colours
    this.requestLocalColours(); 
    this.requestLocalLabels();
    this.requestClientKey();
  }

  setLocalEvents(events) {
    this.events = events;
    this.storage.set('events', JSON.stringify(events));
  }

  requestLocalEvents() {
    this.storage.get('events').then((val) => {
      this.events = JSON.parse(val);
    })
  }
  
  /**
   * 
   * Set the local storages values for each colour key
   * @param colours json object
   */
  setLocalColours(colours){
    this.localColours = JSON.stringify(colours);
    this.storage.set('colours', JSON.stringify(colours));
  }
  /**
  * Set the local storages values for each label key 
  * @param labels Array of strings representing labels
  */
  setLocalLabels(labels){
    this.localLabels = JSON.stringify(labels);
    this.storage.set('labels', JSON.stringify(labels));
  }

  /**
 * Save key value to data field and local storage
 * @param key, value to store 
 */
  setClientKey(key) {
    this.clientKey = key;
    this.storage.set('clientKey', JSON.stringify(key));
  }
  
   /**
   * Get Colour names from local DB
   */
  requestLocalColours() {
   this.storage.get('colours').then((val) => {
      this.localColours = val;
    })
  }

  /**
   * Get label variables from local storage and set label datafield
   */
  requestLocalLabels() {
    this.storage.get('labels').then((val) => {
     this.localLabels = val;
    });
  }
  /**
   * request client key from local storage and set client key data field
   * 
  */
  requestClientKey() {
    this.storage.get('clientKey').then((val) =>
      this.clientKey = JSON.parse(val));
  }

/** 
 * Get the colour values stored in the local storage and return an array
 */
  parseColoursToArray() {
    let colourArr = [];

    let colours = JSON.parse(this.localColours);
    colourArr.push(colours.colour_one)
    colourArr.push(colours.colour_two)
    colourArr.push(colours.colour_three)
    return colourArr;
}
/** 
 * Get the label values stored in the local storage and return an array.
 */
  parseLabelsToArray() {
    let labelArr = [];

    let labels = JSON.parse(this.localLabels);
    labelArr.push(labels.label_one)
    labelArr.push(labels.label_two)
    labelArr.push(labels.label_three)
    return labelArr;
}
/**
 * Takes an array of colours and creates and object we can store in local storage.
 * 
 * @param array colour values we want to put in local storage.
 */
  saveArrayOfColours(array) {
    var jsonObj = {
      colour_one: array[0],
      colour_two: array[1],
      colour_three: array[2]
    }
    this.setLocalColours(jsonObj);  
  } 

/**
 * Takes an array of labels and creates and object we can store in local storage.
 * 
 * @param array label values we want to put in local storage.
 */ 
  saveArrayOfLabels(array) {
    var jsonObj = {
      label_one: array[0],
      label_two: array[1],
      label_three: array[2]
    }
    this.setLocalLabels(jsonObj);
  }
  

}
