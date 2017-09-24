import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { EditPage } from '../edit/edit';
import { AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';
import { UserLocalStorage } from '../../providers/user-local-storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  date: Date;
  display_days: string[] = new Array();
  weekday_header: string;
  selected_date: number = 0;

  // This data will be filled by http.

  input_data: any[][][] = new Array();
  colours: string[];
  labels: string[];

  actionSheet;
  parameter1: number;

  // bubbles = [[timebar_location (size) ,labels ,start_d ,end_d ,description ,location ,colour ,time_s ,
  //            time_e ,id ,repeatYN ,repeat_freq ,repeatDate_S ,repeatDate_E]]
  bubbles: any[][][] = new Array();

  // Sets up dates in the header of homepage.
  constructor(public navCtrl: NavController, public  http: Http, private navParams: NavParams,
               public actionSheetCtrl: ActionSheetController, public localStorage: UserLocalStorage, public alertCtrl: AlertController) {

    this.parameter1 = navParams.get('param1');


    this.date = new Date();
    // set header to the current day name from days array.
    this.weekday_header = this.days[this.date.getDay()];
    // Set colour data field from values stored in provider for local
    this.colours = this.localStorage.parseColoursToArray();
    this.labels = this.localStorage.parseColoursToArray();
    this.initaliseBubbles();
  }
  // set entry conditions
  ionViewCanEnter():any {
    if (this.localStorage.clientKey) {
      return true;
    } else {
      // redirect user to login page@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ TOMTOMT TOMTOTTMOTMOTMOTMOTOMTTMOTOMTMO
    }

  }

  initaliseBubbles() {
    for (var day = 0; day != 5; day++) {
      this.bubbles.push([]);
    }
  }
  ionViewWillEnter() {
    this.reinitalizeView();
  }

  /**
   * the setup function
   */
  reinitalizeView() {
    this.colours = this.localStorage.parseColoursToArray();
    this.labels = this.localStorage.parseLabelsToArray();

    this.input_data = new Array();
    this.bubbles = new Array();

    this.initaliseBubbles();
    this.parseEvents(this.localStorage.events);
    this.filterData();
    this.displayWeekDays();

  }

  /**
   * Process data requested from the provider and push to array
   * 
   * @param eventArr Array containing events from provider
   */
  parseEvents(eventArr) {
        console.log(eventArr)
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
          this.input_data.push(outerArr);
          outerArr = [];
        });
        console.log("parse events done.")
      }


  filterData() {
    //Setup bubbles array
    for (var day = 0; day < this.input_data.length; day++) {
      for (var bubble_selected = 0; bubble_selected < this.input_data[day].length; bubble_selected++) {
        var filtered = new Array();

        var timebar_location;
        var labels = '';
        var colour = '';
        var time_start_24 = this.input_data[day][bubble_selected][2];
        var time_end_24 = this.input_data[day][bubble_selected][3];
        var type = this.input_data[day][bubble_selected][1];
        var start = this.input_data[day][bubble_selected][2];
        var end = this.input_data[day][bubble_selected][3];
        var description = this.input_data[day][bubble_selected][4];
        var location = this.input_data[day][bubble_selected][5];
        var id = this.input_data[day][bubble_selected][0];

        // var repeatYN = this.input_data[day][bubble_selected][];
        // var repeat_freq = ;
        // var repeatDate_S = ;
        // var repeatDate_E = ;

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
        var start_hours_24 = new Date(this.input_data[day][bubble_selected][2] * 1000).getHours().toString();
        var start_mins_24 = new Date(this.input_data[day][bubble_selected][2] * 1000).getMinutes().toString();
        var end_hours_24 = new Date(this.input_data[day][bubble_selected][3] * 1000).getHours().toString();
        var end_mins_24 = new Date(this.input_data[day][bubble_selected][3] * 1000).getMinutes().toString();

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
        this.bubbles[day].push(filtered);

      }
    }
  }

  // Changes where the style of underlines goes for each date.
  // Number is the button that has been clicked.
  dateChange(newValue: number) {
    if (this.selected_date !== newValue) {
      this.selected_date = newValue;
      this.weekday_header = this.days[this.addDays(new Date(), this.selected_date).getDay()];
    }
  }

  // When the add button is clicked the create page is loaded.
  createPage() {
    this.navCtrl.push(CreatePage);
  }

  editPage(bubble) {
    this.navCtrl.push(EditPage,bubble);
  }

  ionViewDidLoad() {
  }

  // Works out the date in number days
  addDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
  }

  giveDay(numberOfDays) {
    var day: number = this.addDays(new Date(), numberOfDays).getDate();
    return day;
  }

  giveMonth(numberOfDays) {
    var month: number = this.addDays(new Date(), numberOfDays).getMonth();
    return month;
  }

  // Display the next 5 days
  // Formatted: date_number month.
  displayWeekDays() {
    // Adds 5 dates to the page.
    for (var date = 0; date < 5; date++) {
      //this.display_days[date] = this.giveDay(date) + " " + this.months[this.giveMonth(date)];
      this.display_days[date] = moment().add(date, "days").format("D MMM");
    }
  }

  delete(bubble : number) {
    this.actionSheet = this.actionSheetCtrl.create({
      title: 'Edit or Delete event?',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Edit',
          role: 'open',
          handler: () => {
            this.editPage(this.bubbles[this.selected_date][bubble])
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            // pass the item we want to delete to the deleteItem method
            this.deleteItem(this.bubbles[this.selected_date][bubble][9]);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    this.actionSheet.present();
  }
/**
 * sends an id to the api to delete an item from the users
 * timline.
 * @param item, item to delete from timeline
 */
  deleteItem(item) {
  let headers: Headers =  new Headers();
    headers.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    headers.append('client_key', this.localStorage.clientKey);
    headers.append('Content-Type', 'application/json');

    let body = {
      'event_id': item
    };
    this.http.post('https://api.simpalapps.com/driver/delete/event', JSON.stringify(body), {headers:headers})
    .map(res => res.json())
      .subscribe(response => {
        if (response.success) {
          this.getEvents()

        } else {
          // display error message to user
          this.presentAlert(response.data)
        }
      },
      err => {
          console.log("Something went wrong with your getEvents request")
      })
    } 

    /**
     * Alert user indicating their issue
     * @param errorMessage, message to display
     */    
    presentAlert(errorMessage: string) {
      let alert = this.alertCtrl.create({
        title: 'Login Failed',
        message: errorMessage,
        buttons: ['Dismiss']
      });
      alert.present();
   }
  /**
   * Called when user succesfully deletes an event.
   * send post request away to API and get users events and call the initialisation function again
   * 
   */
  getEvents() {
  var start = moment().startOf('day').unix();
  let eventHeaders: Headers =  new Headers();
    eventHeaders.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    eventHeaders.append('client_key', this.localStorage.clientKey);
    eventHeaders.append('Content-Type', 'application/json');
    let body = {
      'from': start
    };
    this.http.post('https://api.simpalapps.com/driver/get/events', JSON.stringify(body), {headers:eventHeaders})
    .map(res => res.json())
      .subscribe(response => {
        if (response.success) {
          this.localStorage.events = response.data
          this.localStorage.setLocalEvents(response.data);
          this.reinitalizeView();
         //this.navCtrl.setRoot(TabsPage);
        } else {
          // display error message to user
          this.presentAlert(response.data)
        }
      },
      err => {
          console.log("Something went wrong with your getEvents request")
      })
    } 
  }
