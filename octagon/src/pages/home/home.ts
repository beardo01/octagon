import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { CreatePage } from '../create/create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {

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
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];
    var now = new Date();
    var day = days[now.getDay()];

    // Adds the day text to the page.
    document.getElementById('dayDay').innerHTML += day;

    // Adds 5 dates to the page.
    for (var i = 0; i < 5; i++) {
      console.log(i);
      document.getElementById("button" + i).innerHTML += (now.getDate() + i).toString() + " " + months[(now.getMonth())];
    }
  }

}