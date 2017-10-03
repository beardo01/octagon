import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { UserLocalStorage } from '../../providers/user-local-storage';


@Component({
  selector: 'page-label',
  templateUrl: 'label.html'
})
export class LabelPage {
  // get these top 4 data fields from the cordova plugin or local storage.
  colours: string [] = [];
  label_one: string;
  label_two: string;
  label_three: string;
  labelForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public builder: FormBuilder,
             public localStorage: UserLocalStorage, public http: Http, public alertCtrl: AlertController) {
    // Set the label and colour data fields to data we read in from the provider localColoursAndLabels

    var labelArr: string[] = this.localStorage.parseLabelsToArray()
    this.label_one = labelArr[0];
    this.label_two = labelArr[1];
    this.label_three = labelArr[2];

    this.colours = this.localStorage.parseColoursToArray()


    this.labelForm = this.builder.group({
      'label_one': [this.label_one, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])],
      'label_two': [this.label_two, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])],
      'label_three': [this.label_three, Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3),Validators.required])]
    })
    // Call Web API
    //this.requestColoursAndLabels();
  }

  ionViewDidLoad() {}

  /**
   * Update colours and labels in local storage and provider
   */
  labelsToArray() {
    var labelArr: string[] = [];
    labelArr.push(this.labelForm.controls['label_one'].value);
    labelArr.push(this.labelForm.controls['label_two'].value);
    labelArr.push(this.labelForm.controls['label_three'].value);
    return labelArr;

  }

  /**
   * If user has made valid choices, send a post request to the server with the new colour changes
   * wait for response.
   * If unsuccessfull we alert the user.
   * If successfull we pop to settings page.
   *
   * @param labelArr, colours to send to the server and save in local storage
   */
    setLabels(labelArr) {
    // post to server and set new colour strings
    let headers: Headers =  new Headers();
    headers.append('Authorization', 'Token ' + this.localStorage.clientKey);
    headers.append('Content-Type', 'application/json');

    let body = {
      "user": this.localStorage.id,
      "label_one": labelArr[0],
      "label_two": labelArr[1],
      "label_three": labelArr[2],
    };
    return this.http.patch('http://0.0.0.0:8000/timeline/' + this.localStorage.id + '/', JSON.stringify(body), {headers: headers})
      .map(res =>
       res.json()).subscribe ( response => {
        if (response.id) {
          // server recieved data
          this.localStorage.saveArrayOfLabels(this.labelsToArray());
          // pop to settings page
          this.navCtrl.pop();

        } else {
          this.presentAlert(response.data);
        }
      });
    }


  presentAlert(errorMessage: string) {
    let alert = this.alertCtrl.create({
      title: 'Error during registration',
      message: errorMessage,
      buttons: ['Dismiss']
      });
    alert.present();
    }
/**
 * Send data to web based database and update local storage
 */
  save() {
    this.submitAttempt = true;

    if(!this.labelForm.valid) {
    } else {
      this.setLabels(this.labelsToArray());



    }
  }
}
