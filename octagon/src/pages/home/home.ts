import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreatePage } from '../create/create';

import { Http } from '@angular/http';
import { ColoursAndLabels } from '../../providers/colours-and-labels';
import { EventData } from '../../providers/event-data';
import { Storage } from '@ionic/storage';
import { LocalColoursAndLabels } from '../../providers/local-colours-and-labels';


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

  // This data will be filled by http.
<<<<<<< HEAD
  input_data: any[][] = [
    [456, 0, 1495777978, 1495777978, 'Meeting Tom', 'Owheo Building'],
    [876, 1, 1495828800, 1495828800, 'tgiutgtg', 'Outside RMT'],
    [543, 2, 1495785600, 1495785600, 'rkgjbgibdig', 'Outside RMT']
  ];
  colours: string[];
  labels: string[];
=======
  input_data: any[][] = new Array();
  colours: string[] = ['red', 'blue', 'green'];
  labels: string[] = ['Meeting', 'Assignment', 'Event'];
>>>>>>> f9d91a293e7a7bad82f0ce39d2403c5255fb4883

  // bubbles = [[timebar_location,labels,start,end,description,location,colour]]
  //                  [0]           [1]   [2]   [3]   [4]         [5]     [6]
  bubbles: any[][] = new Array();

  // Sets up dates in the header of homepage.
  constructor(public navCtrl: NavController, http: Http, public coloursAndLabels: ColoursAndLabels, 
              public eventData: EventData, public storage: LocalColoursAndLabels) {
  
    this.date = new Date();
    // set header to the current day name from days array.
    this.weekday_header = this.days[this.date.getDay()];
    // Set colour data field from values stored in provider
    this.colours = this.getProviderColours();
    // set labels data field from values stored in provider
    this.labels = this.getProviderLabels();
  }

  reinitalizeView() {
    var localColours = this.getProviderColours();
    var localLabels = this.getProviderLabels();
    this.colours = localColours;
    this.labels = localLabels;
    // set labels data field from values stored in provider

    // Make call to WEB API
    this.requestColoursAndLabels();
    this.requestEventData();

    // reload events
    this.input_data = [];
    this.bubbles = [];

    this.parseEvents(this.eventData.getEvents());
  }
  ionViewWillEnter() {
    this.reinitalizeView();
  }

  getProviderColours(){
    return this.storage.getProviderColours();
  }

  getProviderLabels() {
    return this.storage.getProviderLabels();
  }

    /**
   * Make a call to the coloursAndLabels provider that requests data from the api.
   * If sucessfull set variables accordinly. If it fails get data from local storage.
   * 
   */
  requestColoursAndLabels() {
    this.coloursAndLabels.requestColoursAndLabels()
    .subscribe(
      response => {
        this.colours = this.coloursAndLabels.getColours();
        this.labels = this.coloursAndLabels.getLabels();

        // Update Local storage
        if (this.storage.colours != this.colours || this.storage.labels != this.labels) {
            this.setLocalStorage();
        }
      },
      error => {
        console.log(error);
        }
      );
  }
    /**
   * Update colours and labels in local storage and provider
   */
  setLocalStorage() {
    this.storage.setProviderColours(this.colours);
    this.storage.setStorageColours(this.colours);
    this.storage.setProviderLabels(this.labels);
    this.storage.setStorageLabels(this.labels);
  } 
  /**
   * Request data from provider.
   */
  requestEventData() {
    this.eventData.requestEventData()
    .subscribe(
      response => {
        //console.log(this.eventData.getEvents().length);
        //console.log(this.eventData.getEvents());
        
        // Executes when we have recieved data from the web API
        this.input_data = [];
        this.parseEvents(this.eventData.getEvents());
        this.filterData();
        this.displayWeekDays();
      },
      error => {
        console.log(error);
        this.filterData();
        this.displayWeekDays();
        this.displayBubbles();
        // Can't connect to network, use what's in local storage
      });
  } 

  /**
   * Process data requested from the provider and push to array
   * 
   * @param eventArr Array containing events from provider
   */
  parseEvents(eventArr) {
    eventArr.forEach(element => {
      var arr = []
      arr.push(element.id);
      arr.push(element.type);
      arr.push(element.start);
      arr.push(element.end);
      arr.push(element.description);
      this.input_data.push(arr);
    });
  } 


  filterData() {
    //Setup bubbles array
    for (var a = 0; a < this.input_data.length; a++) {

      var filtered = new Array();

      var timebar_location;
      var labels = '';
      var colour = '';
      var time_start_24 = this.input_data[a][2];
      var time_end_24 = this.input_data[a][3];
      var type = this.input_data[a][1];
      var start = this.input_data[a][2];
      var end = this.input_data[a][3];
      var description = this.input_data[a][4];
      var location = this.input_data[a][5];
      var id = this.input_data[a][0];

      // Writes the correct colour depending on type.
      if (type === 0) {
        colour = this.colours[0]
      } else if (type === 1) {
        colour = this.colours[1]
      } else if (type === 2) {
        colour = this.colours[2]
      }

      // Writes the correct label depending on type.
      if (type === 0) {
        labels = this.labels[0]
      } else if (type === 1) {
        labels = this.labels[1]
      } else if (type === 2) {
        labels = this.labels[2]
      }

      // Writes a formatted time from UNIX to 24 hours.
      var start_hours_24 = new Date(this.input_data[a][2] * 1000).getHours().toString();
      var start_mins_24 = new Date(this.input_data[a][2] * 1000).getMinutes().toString();
      var end_hours_24 = new Date(this.input_data[a][3] * 1000).getHours().toString();
      var end_mins_24 = new Date(this.input_data[a][3] * 1000).getMinutes().toString();

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

      // this.bubbles[x][1] is the first time.
      // 2359 is the heighest time on the bar.
      // 78 is where the heighest bubble can go.
      // +2 is the padding for start and end.
      timebar_location = ((time_start_24 / 2359) * 78) + 2;

      // Fill filtered array with data.
      filtered.push(timebar_location + '%'); // [0]
      filtered.push(labels);           // [1]
      filtered.push(start);            // [2]
      filtered.push(end);              // [3]
      filtered.push(description);      // [4]
      filtered.push(location);         // [5]
      filtered.push(colour);           // [6]
      filtered.push(time_start_24);    // [7]
      filtered.push(time_end_24);      // [8]
      filtered.push(id);               // [9]

      // Push filtered bubble to bubbles.
      this.bubbles.push(filtered);
    }
    this.bubbles.sort();
  }

  // Changes where the style of underlines goes for each date.
  // Number is the button that has been clicked.
  dateChange(newValue: number) {
    if (this.selected_date !== newValue) {
      this.selected_date = newValue;
    }
  }

  // When the add button is clicked the create page is loaded.
  createPage() {
    this.navCtrl.push(CreatePage);
  }

  ionViewDidLoad() {
<<<<<<< HEAD
    
    //this.filterData();
=======
    this.requestEventData();
>>>>>>> f9d91a293e7a7bad82f0ce39d2403c5255fb4883
  }
  // Display the next 5 days
  // Formatted: date_number month.
  displayWeekDays(){
    for (var i = 0; i < 5; i++) {
      this.display_days[i] = ((this.date.getDate() + i).toString() + " " + this.months[this.date.getMonth()].toString());
    }
  }

}