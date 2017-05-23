import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { CreatePage } from '../create/create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  date : Date; 
  display_days : string []= ["0","0","0","0","0"];
  weekday_header: string;

  constructor(public navCtrl: NavController) {
    this.date = new Date();
    // set header
    this.weekday_header =  this.days[this.date.getDay()];

    // Display the next 5 days
    for (var i = 0; i < 5; i++) {
      this.display_days[i] = ((this.date.getDate() + i).toString() + " " + this.months[this.date.getMonth()].toString());
    }

  }

  createPage() {
    console.log("called");
    this.navCtrl.push(CreatePage);
  }

  dateChange(i) {
    for (var x = 0; x < 5; x++) {
      document.getElementById("button" + x).style.borderColor = "transparent";
    }
    document.getElementById("button" + i).style.borderBottom = "3px solid white";
  }

  ionViewDidLoad() {
  }

}