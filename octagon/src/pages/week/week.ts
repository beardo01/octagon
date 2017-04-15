import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { CreatePage } from '../create/create';

@Component({
  selector: 'page-week',
  templateUrl: 'week.html'
})
export class WeekPage {

  constructor(public navCtrl: NavController) {

  }

  createPage() {
    this.navCtrl.push(CreatePage);
  }

}
