import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class ClearLocalStorage {

  constructor(public storage: Storage) {}
  
  clearLocalStorage() {
    console.log('Cleared Local storage');
    this.storage.clear();
  }

}
