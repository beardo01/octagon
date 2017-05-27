import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LocalColoursAndLabels provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalColoursAndLabels {
  colours: string [] = [];
  labels: string [] = [];

  constructor(public storage: Storage) {
      this.requestLocalColours();
      this.requestLocalLabels();
  }

  /**
   * Set the providers colour data field
   * @param colours Array of strings containing colour names
   */
  setProviderColours(colours: string[] ){
    this.colours = colours;
  }
  /**
   * Set the providers label data field
   * @param labels Array of strings containing the label names
   */
  setProviderLabels(labels: string[] ){
    this.labels = labels;
  }
  /**
   * return values stored in providers label data field
   */
  getProviderLabels() {
    return this.labels;
  }
  /**
   * return value stored in providers colour data field
   */
  getProviderColours() {
    return this.colours;
  }
  /**
   * Set the local storages values for each colour key
   * @param colours Array of strings containing colour names
   */
  setStorageColours(colours: string[] ){
    this.storage.set('colour1', colours[0]);
    this.storage.set('colour2', colours[1]);
    this.storage.set('colour3', colours[2]);
  }
  /**
  * Set the local storages values for each label key 
  * @param labels Array of strings representing labels
  */
  setStorageLabels(labels: string[] ){
    this.storage.set('label1', labels[0]);
    this.storage.set('label2', labels[1]);
    this.storage.set('label3', labels[2]);
  }
  
   /**
   * Get Colour names from local DB
   */
  requestLocalColours() {
   return this.storage.get('colour1').then((val) => {
      this.colours[0] = val;
    }),
    this.storage.get('colour2').then((val) => {
      this.colours[1] = val;
    }),
    this.storage.get('colour3').then((val) => {
      this.colours[2] = val;
    });
  }

  /**
   * Get label variables from local DB
   */
  requestLocalLabels() {
    return this.storage.get('label1').then((val) => {
      this.labels[0] = val;
    }),
    this.storage.get('label2').then((val) => {
      this.labels[1] = val;
    }),
    this.storage.get('label3').then((val) => {
      this.labels[2] = val;
    });
  }

} // end class
