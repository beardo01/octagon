import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-join',
  templateUrl: 'join.html'
})
export class JoinPage {
  tabBarElement: any;
  scrollContent: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }
    this.scrollContent = document.querySelector('.scroll-content');
  }

  ionViewWillEnter() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'none';
    }
    this.scrollContent.style.margin = '0';
  }

  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'flex';
      // Margin bottom needs to be set as 0 for scroll content.
    }
    this.scrollContent.style.margin = '0';

  }

  signInPage() {
    this.navCtrl.pop(JoinPage);
  }

  homePage() {
    this.navCtrl.popToRoot();
  }

}