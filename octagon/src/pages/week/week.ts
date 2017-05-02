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

  ionViewDidLoad() {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',];
    var now = new Date();
    var todaysDate = (now.getDate()).toString() + " " + months[(now.getMonth())];

    function addDays(dateObj, numDays) {
      dateObj.setDate(dateObj.getDate() + numDays);
      return dateObj;
    }

    var in5Day = addDays(new Date(), 4).getDate().toString();
    var in5Month = months[addDays(new Date(), 4).getMonth()].toString();

    // Adds the day text to the page of a 5 day range.
    document.getElementById('weekDay').innerHTML += todaysDate + " - " + in5Day + " " + in5Month;

    // Adds 5 dates to the page.
    for (var i = 0; i < 5; i++) {
      document.getElementById("weekDates").innerHTML += "<h4>" + (now.getDate() + i).toString() + " " + months[(now.getMonth())] + "</h4>";
    }
  }

}
