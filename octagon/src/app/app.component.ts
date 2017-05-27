import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';

import { LocalColoursAndLabels } from '../providers/local-colours-and-labels';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, ]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, public localColoursAndLabels: LocalColoursAndLabels) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //console.log("REQESTING DATA - app.component.ts")
      //this.coloursAndLabels.requestColoursAndLabels();
      this.localColoursAndLabels.requestLocalColours();
      this.localColoursAndLabels.requestLocalLabels().then(() =>
        // do some usefull shit here
        console.log("called from app.component", this.localColoursAndLabels.getProviderColours())
      );

      Splashscreen.hide();
    });
  }
}
