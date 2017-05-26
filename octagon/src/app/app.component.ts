import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';

import { ColoursAndLabels } from '../providers/colours-and-labels';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, ]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, public coloursAndLabels: ColoursAndLabels) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //console.log("REQESTING DATA - app.component.ts")
      //this.coloursAndLabels.requestColoursAndLabels();

      Splashscreen.hide();
    });
  }
}
