import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalEvents } from '../providers/local-events';
import { EventData } from '../providers/event-data';
import { LocalColoursAndLabels } from '../providers/local-colours-and-labels';
import { ColoursAndLabels } from '../providers/colours-and-labels';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, ]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, public localColoursAndLabels: LocalColoursAndLabels, 
              public localEvents: LocalEvents, public coloursAndLabels: ColoursAndLabels, public eventData: EventData) {
    platform.ready().then(() => {
      // Check to see if we have events saved in local storage.
      // if we don't request events from API (user may have cleared cache so we need to refresh)
      this.localEvents.requestLocalEvents().then( response => {
        if(this.localEvents.getProviderEvents() == '') {
          this.eventData.requestEventData().toPromise().then(response => {
           this.localEvents.setLocalStorageEvents(this.eventData.getEvents())
         })
        }
      })

      // get local data
      this.localColoursAndLabels.requestLocalLabels();
      this.localColoursAndLabels.requestLocalColours();
      this.localEvents.requestLocalEvents();

      Splashscreen.hide();
    });
  }
  
}
