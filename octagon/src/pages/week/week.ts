import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserLocalStorage } from '../../providers/user-local-storage';
import * as moment from 'moment';


@Component({
  selector: 'page-week',
  templateUrl: 'week.html'
})
export class WeekPage {

  // Holds all filtered array of days.
  bubbles_week: any[][][] = new Array();
  date_range: string;
  display_days: string[] = new Array();

  // Arrays filled by http
  //Holds all input data of each day.
  input_data_days: any[][][] = new Array();
  colours: string[];
  labels: string[];

  constructor(public navCtrl: NavController, public localStorage: UserLocalStorage ) {
    this.display_days = new Array();

    this.colours = this.localStorage.parseColoursToArray();
    this.labels = this.localStorage.parseColoursToArray();
    this.initaliseBubbles();
  }

  ionViewWillEnter() {
    this.reinitalizeView();
  }
  
  reinitalizeView() {
    this.colours = this.localStorage.parseColoursToArray();
    this.labels = this.localStorage.parseLabelsToArray();

    this.input_data_days = new Array();
    this.bubbles_week = new Array();
    this.initaliseBubbles();
    this.parseEvents(this.localStorage.events);
    this.loadHeaderDates();
    this.filterData();
  }

  // Set up bubbles array to hold spaces for inner arrays
  initaliseBubbles() {
    for (var day = 0; day != 5; day++) {
      this.bubbles_week.push([]);
    }
  }

  /**
   * Process data requested from the provider and push to array
   * 
   * @param eventArr Array containing events from provider
   */
  parseEvents(eventArr) {
        eventArr.forEach(eventObj => {
            var outerArr = [];
            if (eventObj != "No items today"){
              eventObj.forEach(element => {
                var arr = [];
                arr.push(element.id);
                arr.push(element.type);
                arr.push(element.start);
                arr.push(element.end);
                arr.push(element.description);
                arr.push(element.location);
                outerArr.push(arr);
              })
            }
          this.input_data_days.push(outerArr);
          outerArr = [];
        });
    }

  filterData() {
    //Setup bubbles array
    for (var day = 0; day < this.input_data_days.length; day++) {
      for (var bubble_selected = 0; bubble_selected < this.input_data_days[day].length; bubble_selected++) {
        
        var filtered = new Array();
        var type = this.input_data_days[day][bubble_selected][1];
        var input_start_time = this.input_data_days[day][bubble_selected][2];
        var input_end_time = this.input_data_days[day][bubble_selected][3];
        var colour = this.colours[type];
        var start_time = moment.unix(input_start_time).format("HHmm");
        var end_time = moment.unix(input_end_time).format("HHmm");

        // ((first time / heightest possible time) * highest bubble location) + padding.
        var timebar_location = ((parseInt(start_time) / 2359) * 104) + 2 + '%';

        // Fill filtered array with data.
        filtered.push(timebar_location, colour, start_time, end_time);
        // Push filtered array to the week in the selected day.
        this.bubbles_week[day].push(filtered);
      }
    }
  }

  loadHeaderDates() {
    // Top dates in weeks page
    this.date_range = moment().format("D MMM") + " - " + moment().add(4, "days").format("D MMM");

    // Adds 5 dates to the page.
    for (var i = 0; i < 5; i++) {
      this.display_days[i] = moment().add(i, "days").format("D MMM");
    }
  }

  select_day(number: Number) {
    this.navCtrl.parent.select(0);
    this.navCtrl.push(HomePage, {
      param1: number,
    });
    this.navCtrl.popToRoot();
  }
}
