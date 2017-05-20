import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-label',
  templateUrl: 'label.html'
})
export class LabelPage {
  // get these top 4 data fields from the cordova plugin or local storage.
  colours: string [] = ["red", "blue", "purple"];
  label1: string = "I get set";
  label2: string = "from a call";
  label3: string = "to the plugin";

  labelForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public builder: FormBuilder) {
     this.labelForm = this.builder.group({
      'label1': [this.label1, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])],
      'label2': [this.label2, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])],
      'label3': [this.label3, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])]
    })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad LabelPage');
  }
  getColours() {
    // Get colours from cordova plugin
  }
  getLabels() {
    // Get labels from plugin
  }

  save(){
    this.submitAttempt = true;
    if(!this.labelForm.valid){
      console.log("tried to submit invalid form")
    } else {
        console.log("success! Now do something useful with the data (cordova plugin)")
        console.log(this.labelForm.value);
    }
  }
}
