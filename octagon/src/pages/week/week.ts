import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { ColoursAndLabels } from '../../providers/colours-and-labels';
import { EventData } from '../../providers/event-data';
import { LocalColoursAndLabels } from '../../providers/local-colours-and-labels';
import { LocalEvents } from '../../providers/local-events';
import { HomePage } from '../home/home';

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
  input_data_days: any[][][] = new Array();
  colours: string[];
  labels: string[];

  constructor(public navCtrl: NavController, http: Http, public coloursAndLabels: ColoursAndLabels,
    public eventData: EventData, public storage: LocalColoursAndLabels, public localEventStorage: LocalEvents) {
    this.date = new Date();
    this.display_days = new Array();

    // Set colour data field from values stored in provider
    this.colours = this.getProviderColours();
    // set labels data field from values stored in provider
    this.labels = this.getProviderLabels();
    this.initaliseBubbles();
  }

  ionViewWillEnter() {
    this.reinitalizeView();
  }

  reinitalizeView() {
    console.log("rein reinitalizeView() called - week page")
    this.colours = this.getProviderColours();
    this.labels = this.getProviderLabels();

    this.input_data_days = new Array();
    this.bubbles_week = new Array();

    this.initaliseBubbles();
    this.parseEvents(this.localEventStorage.getProviderEvents());
    this.filterData();
  }

  // Values from local storage
  getProviderColours() {
    return this.storage.getProviderColours();
  }
  //values from local storage
  getProviderLabels() {
    return this.storage.getProviderLabels();
  }
  // Set up bubbles array to hold spaces for inner arrays
  initaliseBubbles() {
    for (var day = 0; day != 5; day++) {
      this.bubbles_week.push([]);
    }
  }
  //     /**
  //  * Make a call to the coloursAndLabels provider that requests data from the api.
  //  * If sucessfull set variables accordinly. If it fails get data from local storage.
  //  * 
  //  */
  //   requestColoursAndLabels() {
  //     this.coloursAndLabels.requestColoursAndLabels()
  //       .subscribe(
  //       response => {
  //         this.colours = this.coloursAndLabels.getColours();
  //         this.labels = this.coloursAndLabels.getLabels();

  //         // Update Local storage
  //         if (this.storage.colours != this.colours || this.storage.labels != this.labels) {
  //           this.setLocalStorage();
  //         }
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //       );
  //   }
  //     /**
  //  * Update colours and labels in local storage and provider
  //  */
  //   setLocalStorage() {
  //     this.storage.setProviderColours(this.colours);
  //     this.storage.setStorageColours(this.colours);
  //     this.storage.setProviderLabels(this.labels);
  //     this.storage.setStorageLabels(this.labels);
  //   }
  /*

    /**
   * Process data requested from the provider and push to array
   * 
   * @param eventArr Array containing events from provider
   */
  parseEvents(eventArr) {
    if (eventArr != '') {
      var outerArr = [];
      eventArr.forEach(event => {
        event.forEach(element => {
          var arr = [];
          arr.push(element.id);
          arr.push(element.type);
          arr.push(element.start);
          arr.push(element.end);
          arr.push(element.description);
          arr.push(element.location);
          outerArr.push(arr);
        });
        this.input_data_days.push(outerArr);
        outerArr = [];
      });
    }
  }
  //   /**
  //  * Request data from provider.
  //  */
  // requestEventData() {
  //   this.eventData.requestEventData()
  //     .subscribe(
  //     response => {
  //       //console.log(this.eventData.getEvents().length);
  //       //console.log(this.eventData.getEvents());

  //       // Executes when we have recieved data from the web API
  //       this.input_data_days = new Array();
  //       this.parseEvents(this.eventData.getEvents());
  //       this.filterData();
  //     },
  //     error => {
  //       console.log(error);
  //       this.filterData();
  //       // Can't connect to network, use what's in local storage
  //     });
  // }
  // Works out the date in 5 days
  addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
  }

  filterData() {
    //Setup bubbles array
    for (var day = 0; day < this.input_data_days.length; day++) {

      for (var bubble_selected = 0; bubble_selected < this.input_data_days[day].length; bubble_selected++) {
        var filtered = new Array();

        var type = this.input_data_days[day][bubble_selected][1];
        var time_start_24 = this.input_data_days[day][bubble_selected][2];
        var time_end_24 = this.input_data_days[day][bubble_selected][3];

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
        var start_hours_24 = new Date(this.input_data_days[day][bubble_selected][2] * 1000).getHours().toString();
        var start_mins_24 = new Date(this.input_data_days[day][bubble_selected][2] * 1000).getMinutes().toString();
        var end_hours_24 = new Date(this.input_data_days[day][bubble_selected][3] * 1000).getHours().toString();
        var end_mins_24 = new Date(this.input_data_days[day][bubble_selected][3] * 1000).getMinutes().toString();

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
        height = (timebar_end - timebar_start) - 14;
        if (height === 0) {
          height = 7;
        }
        // Fill filtered array with data.
        filtered.push(timebar_location); // [0]
        filtered.push(colour);           // [1]
        filtered.push(time_start_24);    // [2]
        filtered.push(time_end_24);      // [3]
        filtered.push(height + '%');     // [4]
        // Push filtered bubble to bubbles.
        this.bubbles_week[day].push(filtered);
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

  select_day(number: Number) {
    this.navCtrl.parent.select(0);
    this.navCtrl.push(HomePage, {
      param1: number,
    });
    this.navCtrl.popToRoot();
  }
}
