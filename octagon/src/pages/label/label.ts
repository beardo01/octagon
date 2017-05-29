import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ColoursAndLabels } from '../../providers/colours-and-labels';
import { LocalColoursAndLabels } from '../../providers/local-colours-and-labels';
import { SyncData } from '../../providers/sync-data'


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
              public storage: LocalColoursAndLabels, public sync: SyncData) {
    // Set the label and colour data fields to data we read in from the provider localColoursAndLabels

    var labelArr: string[] = this.getProviderLabels();
    this.label1 = labelArr[0];
    this.label2 = labelArr[1];
    this.label3 = labelArr[2];

    this.colours = this.getLocalColours();


    this.labelForm = this.builder.group({
      'label1': [this.label1, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])],
      'label2': [this.label2, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])],
      'label3': [this.label3, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])]
    })
    // Call Web API
    //this.requestColoursAndLabels();
  }

  ionViewDidLoad() {}

  /**
   * Update colours and labels in local storage and provider
   */
  setLocalStorage() {
    var labelArr: string[] = [];
    labelArr.push(this.labelForm.controls['label1'].value);
    labelArr.push(this.labelForm.controls['label2'].value);
    labelArr.push(this.labelForm.controls['label3'].value);

    this.storage.setProviderLabels(labelArr);
    this.storage.setStorageLabels(labelArr);
  }
  /**
   * Get colour values stored in local storage
   */
  getLocalColours() {
    return this.storage.getProviderColours();
  }
  /**
   * Get label values stored in local storage and set the formbuilder values accordingly
   */
  getProviderLabels() {
    return this.storage.getProviderLabels();
  }

/**
 * Send data to web based database and update local storage
 */
  save() {
    this.submitAttempt = true;

    if(!this.labelForm.valid) {
      console.log("tried to submit invalid form")
    } else {
      // query api if failed set to storage then push
      this.coloursAndLabels.setLabels(this.labelForm.value).subscribe( response => {
        if (!response.success) {
        // failed to send colours. Need to setup storage till we reconnect.
        console.log("need to push to labels offline");
        this.sync.setSyncLabels(this.labelForm.value);
        }
      })

        this.coloursAndLabels.setLabels(this.labelForm.value);
        this.setLocalStorage();
        this.navCtrl.pop();
    }
  }
}
