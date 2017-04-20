import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JoinPage } from '../join/join';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }
  }

  ionViewWillEnter() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'none';
    }
  }

  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'flex';
    }
  }

  joinPage() {
    this.navCtrl.push(JoinPage);
  }

  homePage() {
    this.navCtrl.popToRoot();
  }

}
