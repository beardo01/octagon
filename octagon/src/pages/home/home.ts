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
    this.navCtrl.push(CreatePage);
  }

  date = new Date();

  // Create the title information.
  public title = {
    day: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2),
  }

  ionViewDidLoad() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',];
    var now = new Date();
    var day = days[now.getDay()];

    // Adds the day text to the page.
    document.getElementById('headDate').innerHTML += day;

    // Adds 5 dates to the page.
    for (var i = 0; i < 5; i++) {
      document.getElementById("selection").innerHTML += "<h4>" + (now.getDate() + i).toString() + " " + months[(now.getMonth())] +  "</h4>";
    }
  }

}