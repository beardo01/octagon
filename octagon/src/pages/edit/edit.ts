import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController,NavParams } from 'ionic-angular';
import { CreateFormValidator } from '../../validators/createForm';
import * as moment from 'moment';
import { AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { UserLocalStorage } from '../../providers/user-local-storage';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})

export class EditPage {
  // form group
  editForm: FormGroup;

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
  repeatStartDate: string;
  repeatEndDate: string;

  padded_month: string;
  padded_day: string;

  groupData: any[];

  // If item repeats or not
  repeat: boolean;

  // Frequency item repeats
  repeatFreq: number;

  // Events description
  description: string;

  //editting bubble
  bubble : any[];

  constructor(public navCtrl: NavController, public builder: FormBuilder, public http: Http, public localStorage: UserLocalStorage,
              public alertCtrl: AlertController, public navParams : NavParams) {
    // initialise data fields
    this.date = new Date();
    this.labelNames = this.localStorage.parseLabelsToArray();
    //   this.colours = [];

    this.bubble = this.navParams.data;

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

    // Form field setup
    this.label = this.bubble['type'];
    this.location = this.bubble['location'];

    this.dateStarts = moment(this.bubble['start']*1000).utc().format("YYYY-MM-DD");
    this.dateEnds = moment(this.bubble['end']*1000).utc().format("YYYY-MM-DD");

    this.timeStarts = moment(this.bubble['start']*1000).utc().format("HH:mm");
    this.timeEnds = moment(this.bubble['end']*1000).utc().format("HH:mm");

    this.description = this.bubble['description'];


    if (this.bubble['repeat_frequency'] != 0){
      this.repeat = true;
      this.repeatFreq = this.bubble['repeat_frequency'];
      this.repeatStartDate = moment(this.bubble['repeat_start']*1000).utc().format("YYYY-MM-DD");
      this.repeatEndDate = moment(this.bubble['repeat_end']*1000).utc().format("YYYY-MM-DD");
    } else {
      this.repeat = false;
      this.repeatFreq = this.bubble['repeat_frequency'];
      this.repeatStartDate = this.dateStarts;
      this.repeatEndDate = this.dateEnds;
    }

    //Validate form setting form fields.
    this.editForm = this.builder.group({
      'label': [this.label, Validators.compose([Validators.required, CreateFormValidator.validLabel])],
      'location': [this.location, Validators.compose([Validators.required])],
      'dateStarts': [this.dateStarts, Validators.compose([Validators.required])],
      'dateEnds': [this.dateEnds, Validators.compose([Validators.required])],
      'timeStarts': [this.timeStarts, Validators.compose([Validators.required])],
      'timeEnds': [this.timeEnds, Validators.compose([Validators.required])],
      'repeatFreq': [this.repeatFreq],
      'description': [this.description, Validators.compose([Validators.minLength(3), Validators.required])],
      'repeatStartDate': [this.repeatStartDate, Validators.compose([Validators.required])],
      'repeatEndDate': [this.repeatEndDate, Validators.compose([Validators.required])]
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
    if (this.editForm.valid) {

      var type = this.editForm.value.label;
      var description = this.editForm.value.description;
      var location = this.editForm.value.location;
      var start = moment(this.editForm.value.dateStarts + " " + this.editForm.value.timeStarts + "+0000").toISOString();
      var end = moment(this.editForm.value.dateEnds + " " + this.editForm.value.timeEnds + "+0000").toISOString();
      var repeat_start = moment(this.editForm.value.repeatStartDate + " " + this.editForm.value.timeStarts + "+0000").toISOString();
      var repeat_end = moment(this.editForm.value.repeatEndDate + " " + this.editForm.value.timeEnds + "+0000").toISOString();
      var repeat_freq = parseInt(this.editForm.value.repeatFreq);

      let headers: Headers =  new Headers();

      headers.append('Authorization', 'Token ' + this.localStorage.clientKey);
      headers.append('Content-Type', 'application/json');

      let body = {};

      if(repeat_freq == 0) {
        body = {
          "user": this.localStorage.id,
          "type": type,
          "description": description,
          "location": location,
          "start": start,
          "end": end
        };
      } else {
        body = {
          "user": this.localStorage.id,
          "type": type,
          "description": description,
          "location": location,
          "start": start,
          "end": end,
          "repeat_start": repeat_start,
          "repeat_end": repeat_end,
          "repeat_frequency": repeat_freq
        };
      }

      return this.http.patch('http://0.0.0.0:8000/event/' + this.bubble['id'] + '/', JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(response => {
        if(response.id) {
          // reload events so user can see their new event in the views
          this.getEvents()
        } else {
           this.presentAlert(response.data)
        }
      },
      err =>{
        this.presentAlert("Server Error")
      })
    }
  }
    /**
   * Called when user succesfully creates an event.
   * send post request away to API and get users events
   *
   */
getEvents() {
  let eventHeaders: Headers =  new Headers();
    eventHeaders.set('Authorization', 'Token ' + this.localStorage.clientKey);
    eventHeaders.append('Content-Type', 'application/json');
    this.http.get('http://0.0.0.0:8000/event/list_events/', {headers:eventHeaders})
    .map(res => res.json())
      .subscribe(response => {
        if (response.success) {
          //this.localStorage.events = response.data;
          this.localStorage.setLocalEvents(response.detail);
          this.navCtrl.popToRoot();
        } else {
          // display error message to user
          this.presentAlert(response.data)
        }
      },
      err => {
        this.presentAlert("Server Error")
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
    if (this.repeatFreq == 0) {
      this.repeat = false;
    } else {
      this.repeat = true;
    }
  }
}
