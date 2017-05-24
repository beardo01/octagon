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

  date: Date;
  display_days: string[] = ["0", "0", "0", "0", "0"];
  weekday_header: string;
  selected_date: number = 0;

  // ((1+((1200/1000))-(1200/1000))*40)
  // ((1+((start_time/1000)-(middle_time/1000)))*40)
  // bubble = [posistion,strart_time, end_time, type,color, location, title, description]
  //              [0]       [1]         [2]      [3]  [4]      [5]      [6]     [7]

  bubbles: any[][] = [
    ['', '2359', '0100', 'meeting', 'blue', 'Lab A', '160 Meeting', 'A meeting about 160'],
    ['', '1200', '1230', 'meeting', 'red', 'Lab B', '234 Meeting', 'A meeting about 234'],
    ['', '2200', '2230', 'meeting', 'yellow', 'Lab C', '150 Meeting', 'A meeting about 150'],
    ['', '0000', '0700', 'meeting', 'purple', 'Lab D', '240 Meeting', 'A meeting about 240']
  ];

  // Sets up dates in the header of homepage.
  constructor(public navCtrl: NavController) {
    this.date = new Date();
    // set header to the current day name from days array.
    this.weekday_header = this.days[this.date.getDay()];
    this.bubbles.sort();
  }

  // Changes where the style of underlines goes for each date.
  // Number is the button that has been clicked.
  dateChange(newValue: number) {
    if (this.selected_date === newValue) {
      this.selected_date = 0;
    }
    else {
      this.selected_date = newValue;
    }
  }

  // When the add button is clicked the create page is loaded.
  createPage() {
    console.log("called");
    this.navCtrl.push(CreatePage);
  }

  ionViewDidLoad() {
    // Display the next 5 days
    // Formatted: date_number month.
    for (var i = 0; i < 5; i++) {
      this.display_days[i] = ((this.date.getDate() + i).toString() + " " + this.months[this.date.getMonth()].toString());
    }

    // Works out the position of each bubble and writes to their array.
    for (var x = 0; x < this.bubbles.length; x++) {
      // this.bubbles[x][1] is the first time.
      // 2359 is the heighest time on the bar.
      // 83 is where the heighest bubble can go.
      // +2 is the padding for start and end.
      var margin_left = ((this.bubbles[x][1]/2359)*83) + 2;
      this.bubbles[x][0] = margin_left + '%';
    }
  }

}