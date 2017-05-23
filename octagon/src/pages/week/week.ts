import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { CreatePage } from '../create/create';

@Component({
  selector: 'page-week',
  templateUrl: 'week.html'
})
export class WeekPage {

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 
    'Oct', 'Nov', 'Dec',];

  date: Date;
  date_range: string;
  in5Day: string;
  in5Month: string;

  display_days: string[] = ["0", "0", "0", "0", "0"];

  constructor(public navCtrl: NavController) {
    this.date = new Date();

    // Saves the day in 5 days
    this.in5Day = this.addDays(new Date(), 4).getDate().toString();
    // Saves the month in 5 days
    this.in5Month = this.months[this.addDays(new Date(), 4).getMonth()].toString();

    // First part of the date range.
    this.date_range = (this.date.getDate()).toString() + " " + 
      this.months[(this.date.getMonth())];
    // Second part of the date range.
    this.date_range += " - " + this.in5Day + " " + this.in5Month;

    // Adds 5 dates to the page.
    for (var i = 0; i < 5; i++) {
      this.display_days[i] = ((this.date.getDate() + i).toString() + " " + 
        this.months[this.date.getMonth()].toString());
    }
  }

  // Works out the date in 5 days
  addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
  }

  // When the add button is clicked the create page is loaded.
  createPage() {
    this.navCtrl.push(CreatePage);
  }
}
