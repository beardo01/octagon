import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Splashscreen } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';
//import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';
import { ClearLocalStorage } from '../providers/clear-local-storage';
import { UserLocalStorage } from '../providers/user-local-storage'; 
@Component({
  templateUrl: 'app.html',
  providers: [StatusBar, ]
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, public clearStorage: ClearLocalStorage,
               public storage: Storage, public userLocalStorage: UserLocalStorage) {
    platform.ready().then(() => {
      //this.clearStorage.clearLocalStorage();
      Splashscreen.hide();
    });
  }
  
}
