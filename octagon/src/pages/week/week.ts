import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
//import { CreatePage } from '../create/create';

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

  display_days: string[];

  // Holds all filtered days.
  bubbles_week: any[][][] = new Array();

  // Arrays filled by http
  //Holds all input data of each day.
  input_data_days: any[][][] = [
    [
      [456, 0, 1495828800, 1495836000, 'Meeting Tom', 'Owheo Building'],
      [876, 1, 1495843200, 1495843200, 'tgiutgtg', 'Outside RMT'],          // Day 1
      [543, 2, 1495879200, 1495879200, 'rkgjbgibdig', 'Outside RMT']
    ],
    [
      [456, 0, 1495886400, 1495886400, 'Meeting Tom', 'Owheo Building'],
      [876, 1, 1495922400, 1495922400, 'tgiutgtg', 'Outside RMT'],          // Day 2
      [543, 2, 1495972740, 1495972740, 'rkgjbgibdig', 'Outside RMT']
    ],
    [
      [456, 0, 1496001600, 1496001600, 'Meeting Tom', 'Owheo Building'],
      [876, 1, 1496005200, 1496005200, 'tgiutgtg', 'Outside RMT'],
      [876, 1, 1496030400, 1496030400, 'tgiutgtg', 'Outside RMT'],        // Day 3
      [543, 2, 1496052000, 1496052000, 'rkgjbgibdig', 'Outside RMT']
    ],
    [

    ],
    [
      [456, 0, 1496170800, 1496170800, 'Meeting Tom', 'Owheo Building'],       // Day 5
      [543, 2, 1496188800, 1496231940, 'rkgjbgibdig', 'Outside RMT']
    ]
  ];
  colours: string[] = ['red', 'blue', 'green'];
  labels: string[] = ['Meeting', 'Assignment', 'Event'];

  constructor(public navCtrl: NavController) {
    this.date = new Date();
    this.display_days = new Array();

    for (var z = 0; z != 5; z++) {
      this.bubbles_week.push([]);
    }


  }

  // Works out the date in 5 days
  addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
  }

  filterData() {
    //Setup bubbles array
    for (var z = 0; z < 5; z++) {
      for (var a = 0; a < this.input_data_days[z].length; a++) {

        var filtered = new Array();

        var type = this.input_data_days[z][a][1];
        var time_start_24 = this.input_data_days[z][a][2];
        var time_end_24 = this.input_data_days[z][a][3];

        var timebar_location = '';
        var timebar_start = 0;
        var timebar_end = 0;
        var height = 0;
        var colour = '';

        // Writes the correct colour depending on type.
        if (type === 0) {
          colour = this.colours[0]
        } else if (type === 1) {
          colour = this.colours[1]
        } else if (type === 2) {
          colour = this.colours[2]
        }

        // Writes a formatted time from UNIX to 24 hours.
        var start_hours_24 = new Date(this.input_data_days[z][a][2] * 1000).getHours().toString();
        var start_mins_24 = new Date(this.input_data_days[z][a][2] * 1000).getMinutes().toString();
        var end_hours_24 = new Date(this.input_data_days[z][a][3] * 1000).getHours().toString();
        var end_mins_24 = new Date(this.input_data_days[z][a][3] * 1000).getMinutes().toString();

        if (start_hours_24.length <= 1) {
          start_hours_24 = '0' + start_hours_24;
        }

        if (start_mins_24.length <= 1) {
          start_mins_24 = '0' + start_mins_24;
        }

        if (end_hours_24.length <= 1) {
          end_hours_24 = '0' + end_hours_24;
        }

        if (end_mins_24.length <= 1) {
          end_mins_24 = '0' + end_mins_24;
        }

        time_start_24 = start_hours_24 + start_mins_24;
        time_end_24 = end_hours_24 + end_mins_24;

        // time_start_24 is the first time.
        // 2359 is the heighest time on the bar.
        // 104 is where the heighest bubble can go.
        // +2 is the padding for start and end.
        
        timebar_start = ((time_start_24 / 2359) * 104) + 2;
        timebar_end = ((time_end_24 / 2359) * 104) + 2;
        timebar_location = timebar_start + '%';
        height = (timebar_end-timebar_start)-14;
        if (height === 0) {
          height = 7;
        }
        console.log(timebar_start,timebar_end,height);
        // Fill filtered array with data.
        filtered.push(timebar_location); // [0]
        filtered.push(colour);           // [1]
        filtered.push(time_start_24);    // [2]
        filtered.push(time_end_24);      // [3]
        filtered.push(height + '%');     // [4]

        // Push filtered bubble to bubbles.
        this.bubbles_week[z].push(filtered);
      }
    }
  }

  giveDay(numberOfDays) {
    var day: number = this.addDays(new Date(), numberOfDays).getDate();
    return day;
  }

  giveMonth(numberOfDays) {
    var month: number = this.addDays(new Date(), numberOfDays).getMonth();
    return month;
  }

  ionViewDidLoad() {
    // First date of the date range.
    this.date_range = (this.date.getDate()).toString() + " " +
      this.months[(this.date.getMonth())];
    // Second date of the date range.
    this.date_range += " - " + this.giveDay(4) + " " + this.months[this.giveMonth(4)];

    // Adds 5 dates to the page.
    for (var i = 0; i < 5; i++) {
      this.display_days[i] = this.giveDay(i) + " " + this.months[this.giveMonth(i)];
    }

    this.filterData();
  }
}
