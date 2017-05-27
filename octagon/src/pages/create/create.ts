import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
//import { CreateFormValidator } from '../../validators/createForm';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})

export class CreatePage {
  // form group
  createForm: FormGroup;

  // selected label
  label: string;

  // list of label names
  labelNames: string [];

  // List of colours
  //colours: string [];
  // date object
  date: Date;

  // min and max dates for datetime picker
  minDate: Number;
  maxDate: Number;

  // Date strings
  dateStarts: string;
  dateEnds: string;
  timeStarts: string;
  timeEnds: string;
  repeatEndDate: string;

   // If item repeats or not
  repeat: boolean;

  // Frequency item repeats
  repeatFreq: string;

 // Events description
  description: string;

  constructor(public navCtrl: NavController, public builder: FormBuilder) {
    // initialise data fields
    this.date = new Date();
    this.labelNames = ["Assignment", "Meeting", "Event"]; // Recieve call from plugin and pass data
    //   this.colours = [];
    this.minDate = this.date.getFullYear();
    this.maxDate = this.date.getFullYear() + 2;

    this.dateStarts =  this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
    this.dateEnds =  this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);
    this.timeStarts =  this.getTimes()[0];
    this.timeEnds =  this.getTimes()[1];

    this.repeat = false;
    this.repeatFreq = "Never";
    // initalise repeat date to be set to end date to show a useful value when we need it
    // logic should ignore this value if repeat variable set to false
    this.repeatEndDate = this.dateEnds;
    this.description = "";

    this.getTimes();

    this.createForm = this.builder.group({
      'label' : [this.label],
      'dateStarts' : [this.dateStarts],
      'dateEnds' : [this.dateEnds],
      'timeStarts': [this.timeStarts],
      'timeEnds': [this.timeEnds],
      'repeatFrequency' : [this.repeatFreq],
      'repeatEndDate' : [this.repeatEndDate],
      'description': [this.description] /* 'description': [this.description, CreateFormValidator.validDescription]*/
    });
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
   */
  add(){
    console.log("Form Submission");
    console.log(this.createForm.value);
     
  }
  getLabels() {
    // Make a call to plugin to set the labels
  }

  getTimes() {
    var timeStarts = this.date.getHours() + ':';
    if(this.date.getHours() < 10) { timeStarts = '0' + timeStarts; }
    if(this.date.getMinutes() < 10) { 
      timeStarts = timeStarts + '0' + this.date.getMinutes(); 
    } else {
      timeStarts = timeStarts + this.date.getMinutes();
    }
    var timeEnds = (this.date.getHours() + 1) + ':';
    if(this.date.getHours() < 10) { timeEnds = '0' + timeEnds; }
    if(this.date.getMinutes() < 10) { 
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
  create() {
    this.navCtrl.popToRoot();
  }
}
