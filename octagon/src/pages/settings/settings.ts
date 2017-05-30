import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ColourPage } from '../colour/colour';
import { LabelPage } from '../label/label';
import { Storage } from '@ionic/storage';
import { UserLocalStorage } from '../../providers/user-local-storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public storage: Storage, public localStorage: UserLocalStorage) {

  }

  colourPage() {
    this.navCtrl.push(ColourPage);
  }
  
  logout() {
    this.storage.clear();
    this.localStorage.clientKey = '';
    this.navCtrl.push(LoginPage);
  }

  labelPage() {
    this.navCtrl.push(LabelPage);
  }

}
