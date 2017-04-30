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

  getTimes() {
    var timeStarts = this.date.getHours() + ':';
    if(this.date.getHours() < 10) { timeStarts = '0' + timeStarts; }
    if(this.date.getMinutes() < 10) { 
      timeStarts = timeStarts + '0' + this.date.getMinutes(); 
    } else {
      timeStarts = timeStarts + this.date.getMinutes();
    }
    var timeEnds = (this.date.getHours() + 1) + ':';
    if(this.date.getHours() < 10) { timeEnds = '0' + timeEnds; }
    if(this.date.getMinutes() < 10) { 
      timeEnds = timeEnds + '0' + this.date.getMinutes(); 
    } else {
      timeEnds = timeEnds + this.date.getMinutes();
    }
    return new Array(timeStarts, timeEnds);
  }

  // Create the TimelineItem data
  public item = {
    dateStarts: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2),
    dateEnds: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2),
    timeStarts: this.getTimes()[0],
    timeEnds: this.getTimes()[1],
  }

  ionViewDidLoad() {
    console.log(this.item);
    this.getTimes();
  }

  create() {
    this.navCtrl.popToRoot();
  }

}
