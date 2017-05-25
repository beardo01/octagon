import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ColoursAndLabels } from '../../providers/colours-and-labels';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, http: Http, public coloursAndLabels: ColoursAndLabels) {

  }

/**
 * When view is loaded we call helper function to set the class names of available colours.
 */
  ionViewDidLoad() {
    // get colours from provider and inject into used colour array
    this.inUseColours = this.coloursAndLabels.getColours();
    // get labels from provider and overwrite labels array with values
    this.labels = this.coloursAndLabels.getLabels();
    // call function to push available colours to available colours datafield
    this.getAvailableColours();
 
  }
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
      // Push data to plugin @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
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

  save() {
    // make a post request with data stored in inUseColours array
    // console.log("Save button clicked")
    this.coloursAndLabels.setColours(this.inUseColours);
  }
} // end class
