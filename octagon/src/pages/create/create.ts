import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { CreateFormValidator } from '../../validators/createForm';
import * as moment from 'moment';
import { AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { UserLocalStorage } from '../../providers/user-local-storage';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})

export class CreatePage {
  // form group
  createForm: FormGroup;

  submitAttempt: boolean = false;

  // selected label
  label: string;
  location: string;

  // list of label names
  labelNames: string[];

  // date object
  date: Date;

  // min and max dates for datetime picker
  minDate: string;
  maxDate: Number;

  // Date strings
  dateStarts: string;
  dateEnds: string;
  timeStarts: string;
  timeEnds: string;
  repeatEndDate: string;

  padded_month: string;
  padded_day: string;

  groupData: any[];

  // If item repeats or not
  repeat: boolean;

  // Frequency item repeats
  repeatFreq: string;

  // Events description
  description: string;

  constructor(public navCtrl: NavController, public builder: FormBuilder, public http: Http, public localStorage: UserLocalStorage,
              public alertCtrl: AlertController) {
    // initialise data fields
    this.date = new Date();
    this.labelNames = this.localStorage.parseLabelsToArray();
    //   this.colours = [];

    this.padded_month = (this.date.getMonth()+1).toString();
    this.padded_day = this.date.getDate().toString();

    if (this.padded_month.length != 2) {
      this.padded_month = '0' + this.padded_month;
    }

    if (this.padded_day.length != 2) {
      this.padded_day = '0' + this.padded_day;
    }

    this.minDate = this.date.getFullYear() + '-' + this.padded_month + '-' + this.padded_day;
    this.maxDate = this.date.getFullYear() + 2;

    this.dateStarts = moment().format("YYYY-MM-DD");
    this.dateEnds = moment().add(1, "hour").format("YYYY-MM-DD");
    this.timeStarts = moment().format("HH:MM");
    this.timeEnds = moment().add(1, "hour").format("HH:MM");

    this.repeat = false;
    this.repeatFreq = "Never";
    // initalise repeat date to be set to end date to show a useful value when we need it
    // logic should ignore this value if repeat variable set to false
    this.repeatEndDate = this.dateEnds;
    this.description = "";


    this.createForm = this.builder.group({
      'label': [this.label, Validators.compose([Validators.required, CreateFormValidator.validLabel])],
      'location': [this.location, Validators.compose([Validators.required])],
      'dateStarts': [this.dateStarts, Validators.compose([Validators.required])],
      'dateEnds': [this.dateEnds, Validators.compose([Validators.required])],
      'timeStarts': [this.timeStarts, Validators.compose([Validators.required])],
      'timeEnds': [this.timeEnds, Validators.compose([Validators.required])],
      'repeatFrequency': [this.repeatFreq, Validators.compose([Validators.required])],
      'repeatEndDate': [this.repeatEndDate, Validators.compose([Validators.required])],
      'description': [this.description, Validators.compose([Validators.minLength(3), Validators.required])]
    },
    );
  }
  /* 
   * Called when submitting the form.
   * 
   * Returns an object with this format Note: - YYYY-MM-DD
   *                                          - 24hour timeformat
   * 
   * dateEnds: "2017-07-19"
   * dateStarts: "2017-05-19"
   * description: "Yeah mate should be good."
   * label: "Assignment"
   * repeatEndDate: "2018-05-19"
   * repeatFrequency: "Monthly"
   * timeEnds: "17:21"
   * timeStarts: "18:21"
   * location: "The Sky"
   */
  add() {
    this.submitAttempt = true;
    if (this.createForm.valid) {

      var type = this.labelNames.indexOf(this.createForm.value.label);
      var description = this.createForm.value.description
      var location = this.createForm.value.location
      var start = moment(this.createForm.value.dateStarts + " " + this.createForm.value.timeStarts).unix();
      var end = moment(this.createForm.value.dateEnds + " " + this.createForm.value.timeEnds).unix();
      


      let headers: Headers =  new Headers();
      headers.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
      headers.append('client_key', this.localStorage.clientKey);
      headers.append('Content-Type', 'application/json');

      let body = {
        "type": type,
        "description": description,
        "location": location,
        "start": start,
        "end": end
      };
      return this.http.post('https://api.simpalapps.com/driver/create/event', JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(response => {
        if(response.success) {
          // reload events so user can see their new event in the views
          this.getEvents()
        } else {
           this.presentAlert(response.data)
        }
      },
      err =>{
        console.log("Error while adding event");
      })
    }
  }
    /**
   * Called when user succesfully creates an event.
   * send post request away to API and get users events
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

          this.navCtrl.popToRoot();
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

  /*
   * Toggles if we display the repeatEndDate datepicker based on the value stored in repeatFreq  
   */
  repeatToggle() {
    if (this.repeatFreq == "Never") {
      this.repeat = false;
    } else {
      this.repeat = true;
    }
  }
}
