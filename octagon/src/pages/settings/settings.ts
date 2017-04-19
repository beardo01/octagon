import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ColourPage } from '../colour/colour';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {

  }
  colourPage() {
    this.navCtrl.push(ColourPage);
  }
  logout() {
    this.navCtrl.push(LoginPage);
  }

}
