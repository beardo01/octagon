import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {

  constructor(public navCtrl: NavController) {

  }

  date = new Date();

  // Create the TimelineItem data
  public item = {
    dateStarts: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2),
    dateEnds: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2),
    timeStarts: (this.date.getHours()) + ':' + this.date.getMinutes(),
    timeEnds: (this.date.getHours() + 1) + ':' + this.date.getMinutes(),
  }

}
