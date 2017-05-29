import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalEvents } from '../providers/local-events';
import { EventData } from '../providers/event-data';
import { LocalColoursAndLabels } from '../providers/local-colours-and-labels';
import { ColoursAndLabels } from '../providers/colours-and-labels';
import { ValidateUser } from '../providers/validate-user';
//import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { ClearLocalStorage } from '../providers/clear-local-storage';
import { SyncData } from '../providers/sync-data';

@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, ]
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, public localColoursAndLabels: LocalColoursAndLabels, 
              public localEvents: LocalEvents, public coloursAndLabels: ColoursAndLabels, public eventData: EventData, 
              public clearStorage: ClearLocalStorage, public validUser: ValidateUser, public storage: Storage, public syncData: SyncData) {
    platform.ready().then(() => {

      this.syncData.syncColours();
      this.syncData.syncLabels();
      this.eventData.requestEventData();
       
      
      //this.clearStorage.clearLocalStorage();
      // Redirect to login screen if cant find value 
      this.validUser.requestLocalClientKey();

      // Check to see if we have events saved in local storage.
      // if we don't request events from API (user may have cleared cache so we need to refresh)
      this.eventData.requestEventData();


      // this.localEvents.requestLocalEvents().then(response => {

      //   if( this.localEvents.getProviderEvents() == null ) {
      //     console.log("No Local events found, trying to get from API")
      //     this.eventData.requestEventData();

      //      this.localEvents.setLocalStorageEvents(this.eventData.getEvents())
      //   }
      // })
      //console.log('localstoragessdasdasd', this.localEvents.getProviderEvents())
      // get local data
      this.localColoursAndLabels.requestLocalLabels();
      this.localColoursAndLabels.requestLocalColours();
//      this.localEvents.requestLocalEvents();

      Splashscreen.hide();
    });
  }
  
}
