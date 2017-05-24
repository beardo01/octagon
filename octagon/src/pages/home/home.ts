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
  
  bubbles: any [] [] = [['80%','1230','meeting','blue','Lab A','345 Meeting','A meeting about cosc345'],
                        ['60%','1200','meeting','red','Lab B','345 Meeting','A meeting about cosc345'],
                        ['20%','0900','meeting','green','Lab C','345 Meeting','A meeting about cosc345']];
  
  bubbles_locations: number [] = [];

  // Sets up dates in the header of homepage.
  constructor(public navCtrl: NavController) {
    this.date = new Date();
    // set header to the current day name from days array.
    this.weekday_header = this.days[this.date.getDay()];

    // Display the next 5 days
    // Formatted: date_number month.
    for (var i = 0; i < 5; i++) {
      this.display_days[i] = ((this.date.getDate() + i).toString() + " " + this.months[this.date.getMonth()].toString());
    }

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

}