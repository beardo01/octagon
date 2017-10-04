import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserLocalStorage } from '../../providers/user-local-storage';
import { Http, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-colour',
  templateUrl: 'colour.html'
  })

export class ColourPage {
  //Will be set by a call to the cordova plugin when implemented
  inUseColours: string [] = [];
  //array of available colours
  allColours: string [] = ["red", "blue", "yellow", "green", "grey", "purple"];
  //placeholder defaults
  availableColours: string [] = [];

  labels:  string [] = [];
  // show/hide booleans attached to each event button
  toggle1 : boolean = false;
  toggle2 : boolean = false;
  toggle3 : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: UserLocalStorage,
              public http: Http, public alertCtrl: AlertController) {

    this.inUseColours = this.localStorage.parseColoursToArray();
    this.labels = this.localStorage.parseLabelsToArray()
    this.getAvailableColours();
    // Call Web API
    // this.requestColoursAndLabels();
  }
/**
 * When view is loaded we call helper function to set the class names of available colours.
 */
  ionViewDidLoad() {}

  /**
   * When a user clicks a colour button the value of the button stored in the availableColours array is swapped with
   * the value in the inUseColours array. The ng model take care of displaying the correct values.
   * @param colour; class name of colour passed.
   * @param arrayPosition;
   */
  setEventColour(colour, arrayPosition) {
    if (this.availableColours.indexOf(colour) > -1 ) {
      var availableArrayIndex = this.availableColours.indexOf(colour);
      var oldInUseColour = this.inUseColours[arrayPosition];
      this.inUseColours[arrayPosition] = colour;
      this.availableColours[availableArrayIndex] = oldInUseColour;
    }
  }
/**
 * Checks allColours array against the inUseColours array. if a colour isn't being used it will be pushed to a new
 * array that is used to replace the availableColours array.
 *
 * We call this in viewDidload to initalise the correct values in the hidden colour buttons.
 */
  getAvailableColours() {
    var currentAvailableColours : string [] = [];
    for (let colour of this.allColours) {
      if (this.inUseColours.indexOf(colour) == -1) {
         currentAvailableColours.push(colour);
      }
    }
    this.availableColours = currentAvailableColours;
  }

  /**
   * Toggles hidden list elements in each event button.
   * Called when user clicks on an event button
   */
  displayHidden(event) {
    if(event == "colourOne") {
      if(this.toggle1) {
        this.toggle1 = false;
      } else {
        this.toggle1 = true;
        this.toggle2 = false;
        this.toggle3 = false;
      }
    } else if (event == "colourTwo") {
        if(this.toggle2) {
          this.toggle2 = false;
        } else {
          this.toggle2 = true;
          this.toggle1 = false;
          this.toggle3 = false;
      }
    }  else {
        if(this.toggle3) {
          this.toggle3 = false;
        } else {
          this.toggle3 = true;
          this.toggle1 = false;
          this.toggle2 = false;
      }
    }
  }

  /**
   * If user has made valid choices, send a post request to the server with the new colour changes
   * wait for response.
   * If unsuccessfull we alert the user.
   * If successfull we pop to settings page.
   *
   * @param colourArr, colours to send to the server and save in local storage
   */
    setColours(colourArr) {
    // post to server and set new colour strings
    let headers: Headers =  new Headers();

    headers.append('Authorization', 'Token ' + this.localStorage.clientKey);
    headers.append('Content-Type', 'application/json');

    let body = {
      "user": this.localStorage.id,
      "colour_one": colourArr[0],
      "colour_two": colourArr[1],
      "colour_three": colourArr[2],
    };
    return this.http.patch('https://api.simpalapps.com/timeline/' + this.localStorage.id + '/',
      JSON.stringify(body), {headers: headers})
      .map(res =>
       res.json()).subscribe ( response => {

        if (response.id) {

          this.localStorage.saveArrayOfColours(this.inUseColours);
          this.navCtrl.pop();

        } else {
          this.presentAlert(response);
        }
      });
    }

  /**
   *
   * @param errorMessage, message to display to user
   */
  presentAlert(errorMessage: string) {
    let alert = this.alertCtrl.create({
      title: 'Error during registration',
      message: errorMessage,
      buttons: ['Dismiss']
      });
    alert.present();
  }

  /**
   * Called when user wants to save the settings
   */
  save() {
    this.setColours(this.inUseColours);
  }
} // end class
