import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})

export class CreatePage {
  createForm: FormGroup;
  // date object
  date = new Date();

  repeatFreq: string;
  repeatFreqs: string[] = ["Never", "Daily", "Weekly", "Monthly"];

  label: string;
  labels: string [];

  repeat: boolean = false;

  // min and max dates for datetime picker
  minDate: Number;
  maxDate: Number;

  repeatDate: string;
  
    public item = {
    dateStarts: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2),
    dateEnds: this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2),
    timeStarts: this.getTimes()[0],
    timeEnds: this.getTimes()[1],
  }

  constructor(public navCtrl: NavController, public builder: FormBuilder) {
    this.labels = ["Assignment", "Meeting", "Event"]; // Recieve call from plugin and pass data
    // get freq of object (if editing existing)
    this.repeatDate = this.item.dateEnds;
    this.minDate = this.date.getFullYear();
    this.maxDate = this.date.getFullYear() + 2;
    this.getTimes();

    this.createForm = this.builder.group({
      'label' : [this.label],
      'dateStarts' : [this.item.dateStarts],
      'dateEnds' : [this.item.dateEnds],
      'timeStarts': [this.item.timeStarts],
      'timeEnds': [this.item.timeEnds],
      'repeatFrequency' : [this.repeatFreq],
      'repeatEndDate' : [],
      'description': [],
    });
  }

  add(){
    console.log("called add()");
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
    this.getLabels();
  }

  create() {
    this.navCtrl.popToRoot();
  }

}
