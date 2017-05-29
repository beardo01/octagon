import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { CreateFormValidator } from '../../validators/createForm';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as moment from 'moment';
import { LocalColoursAndLabels } from '../../providers/local-colours-and-labels';

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

  // List of colours
  //colours: string [];
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

  constructor(public navCtrl: NavController, public builder: FormBuilder, public http: Http, public localColoursAndLabels: LocalColoursAndLabels) {
    // initialise data fields
    this.date = new Date();
    this.labelNames = this.localColoursAndLabels.getProviderLabels();
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

    this.dateStarts = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
    this.dateEnds = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
    this.timeStarts = this.getTimes()[0];
    this.timeEnds = this.getTimes()[1];

    this.repeat = false;
    this.repeatFreq = "Never";
    // initalise repeat date to be set to end date to show a useful value when we need it
    // logic should ignore this value if repeat variable set to false
    this.repeatEndDate = this.dateEnds;
    this.description = "";

    this.getTimes();

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
    console.log("time ends" ,this.createForm.value.timeEnds);
    console.log("Date ends", this.createForm.value.dateEnds);
    if (this.createForm.valid) {

      var type = this.labelNames.indexOf(this.createForm.value.label);
      var description = this.createForm.value.description
      var location = this.createForm.value.location
      var start = moment(this.createForm.value.dateStarts + " " + this.createForm.value.timeStarts).unix();
      var end = moment(this.createForm.value.dateEnds + " " + this.createForm.value.timeEnds).unix();
      


      let headers: Headers =  new Headers();
      headers.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
      headers.append('client_key', 'Ym2fv0ZxMyJrnCiwmNDi');
      headers.append('Content-Type', 'application/json');

      let body = {
        "type": type,
        "description": description,
        "location": location,
        "start": start,
        "end": end
      };
      console.log('data sent in add()', JSON.stringify(body));

      return this.http.post('https://api.simpalapps.com/driver/create/event', JSON.stringify(body), {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        console.log("response from server", data)
      })


        //this.navCtrl.popToRoot();
    } else {
      console.log("FAILED");
    }
    console.log("Form Submission");

  }
  getLabels() {
    // Make a call to plugin to set the labels
  }

  getTimes() {
    var timeStarts = this.date.getHours() + ':';
    if (this.date.getHours() < 10) { timeStarts = '0' + timeStarts; }
    if (this.date.getMinutes() < 10) {
      timeStarts = timeStarts + '0' + this.date.getMinutes();
    } else {
      timeStarts = timeStarts + this.date.getMinutes();
    }
    var timeEnds = (this.date.getHours() + 1) + ':';
    if (this.date.getHours() < 10) { timeEnds = '0' + timeEnds; }
    if (this.date.getMinutes() < 10) {
      timeEnds = timeEnds + '0' + this.date.getMinutes();
    } else {
      timeEnds = timeEnds + this.date.getMinutes();
    }
    return new Array(timeStarts, timeEnds);
  }

  ionViewDidLoad() {
    // check if we are editing the page or just making a new one. navaparams maybe?
    //this.getLabels();
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
