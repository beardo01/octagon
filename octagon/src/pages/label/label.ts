import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ColoursAndLabels } from '../../providers/colours-and-labels';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-label',
  templateUrl: 'label.html'
})
export class LabelPage {
  // get these top 4 data fields from the cordova plugin or local storage.
  colours: string [] = [];
  label1: string;
  label2: string;
  label3: string;

  labelForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public builder: FormBuilder, public coloursAndLabels: ColoursAndLabels,
              public storage: Storage) {
    // Set the label and colour data fields to data we read in from the provider ColoursAndLabels
    this.label1 = "Failed";
    this.label2 = "To";
    this.label3 = "Load";

    this.colours = ["grey", "grey", "grey"];
    this.labelForm = this.builder.group({
      'label1': [this.label1, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])],
      'label2': [this.label2, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])],
      'label3': [this.label3, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])]
    })
}

  ionViewDidLoad() {
    this.requestColoursAndLabels();
  }

  /**
   * Make a call to the coloursAndLabels provider if success update local variables and local storage
   * 
   */
  requestColoursAndLabels() {
    this.coloursAndLabels.requestColoursAndLabels()
    .subscribe(
      response => {
        this.colours = this.coloursAndLabels.getColours();
        var labels = this.coloursAndLabels.getLabels();
        
        this.label1 = labels[0];
        this.labelForm.controls['label1'].setValue(this.label1);
        
        this.label2 = labels[1];
        this.labelForm.controls['label2'].setValue(this.label2);
        
        this.label3 = labels[2];
        this.labelForm.controls['label3'].setValue(this.label3);

        this.setLocalStorage();
      },
      error => {
        console.log(error);
        // Can't connect to network, use what's in local storage
        this.getLocalColours();
        this.getLocalLabels();
        }
      );
  } 

  /**
   * Update colours and labels in local storage
   */
  setLocalStorage() {
    this.storage.set('colour1', this.colours[0]);
    this.storage.set('colour2', this.colours[1]);
    this.storage.set('colour3', this.colours[2]);
    this.storage.set('label1', this.labelForm.controls['label1'].value);
    this.storage.set('label2', this.labelForm.controls['label2'].value);
    this.storage.set('label3', this.labelForm.controls['label3'].value);
  }
  /**
   * Get colour values stored in local storage
   */
  getLocalColours() {
    this.storage.get('colour1').then((val) => {
      this.colours[0] = val;
    });
    this.storage.get('colour2').then((val) => {
      this.colours[1] = val;
    });
    this.storage.get('colour3').then((val) => {
      this.colours[2] = val;
    });
  }
  /**
   * Get label values stored in local storage and set the formbuilder values accordingly
   */
    getLocalLabels() {
    this.storage.get('label1').then((val) => {

      this.label1 = val;
      this.labelForm.controls['label1'].setValue(this.label1);
    });
    this.storage.get('label2').then((val) => {
      this.label2 = val;
      this.labelForm.controls['label2'].setValue(this.label2);
    });
    this.storage.get('label3').then((val) => {
      this.label3 = val;
      this.labelForm.controls['label3'].setValue(this.label3);
    });
  }

/**
 * Send data to web based database and update local storage
 */
  save(){
    this.submitAttempt = true;
    if(!this.labelForm.valid){
      console.log("tried to submit invalid form")
    } else {
        console.log("success! Now do something useful with the data (cordova plugin)")
        console.log(this.labelForm.value);
        this.setLocalStorage();
    }
  }
}
