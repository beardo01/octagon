import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ColoursAndLabels } from '../../providers/colours-and-labels';
import { LocalColoursAndLabels } from '../../providers/local-colours-and-labels';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, http: Http, public coloursAndLabels: ColoursAndLabels, 
              public storage: LocalColoursAndLabels) {

    this.inUseColours = this.getProviderColours();
    this.labels = this.getProviderLabels();
    this.getAvailableColours();
    // Call Web API
    this.requestColoursAndLabels();
  }
/**
 * When view is loaded we call helper function to set the class names of available colours.
 */
  ionViewDidLoad() {
  }

  /**
   * Make a call to the coloursAndLabels provider that requests data from the api.
   * If sucessfull set variables accordinly. If it fails get data from local storage.
   * 
   */
  requestColoursAndLabels() {
    this.coloursAndLabels.requestColoursAndLabels()
    .subscribe(
      response => {
        this.inUseColours = this.coloursAndLabels.getColours();
        console.log("getCOlours from WEBAPI");
        console.log(this.coloursAndLabels.getColours());
        this.labels = this.coloursAndLabels.getLabels();
        this.getAvailableColours();

        // Check if we need to update local storage
        if (this.storage.colours != this.inUseColours) {
          this.setLocalStorage();
        }
      },
      error => {
        console.log(error);
      });
  } 

  /**
   * Update colours in local storage
   */
  setLocalStorage() {
    this.storage.setProviderColours(this.inUseColours);
    this.storage.setStorageColours(this.inUseColours);
  }
  /**
   * Get variables from provider
   */
  getProviderColours() {
    return this.storage.getProviderColours();
  }

  /**
   * Get label variables from provider
   */
  getProviderLabels() {
    return this.storage.getProviderLabels();
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
    this.setLocalStorage();
    this.navCtrl.pop();
  }
} // end class
