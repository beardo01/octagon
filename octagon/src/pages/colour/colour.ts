import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ColoursAndLabels } from '../../providers/colours-and-labels';
import { Storage } from '@ionic/storage';


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
              public storage: Storage) {
  }

/**
 * When view is loaded we call helper function to set the class names of available colours.
 */
  ionViewDidLoad() {
    this.requestColoursAndLabels();
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
        this.labels = this.coloursAndLabels.getLabels();
        this.getAvailableColours();
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
   * Update colours in local storage
   */
  setLocalStorage() {
    this.storage.set('colour1', this.inUseColours[0]);
    this.storage.set('colour2', this.inUseColours[1]);
    this.storage.set('colour3', this.inUseColours[2]);
    this.storage.set('label1', this.labels[0]);
    this.storage.set('label2', this.labels[1]);
    this.storage.set('label3', this.labels[2]);
  }
  /**
   * Get variables from local DB
   */
  getLocalColours() {
    this.storage.get('colour1').then((val) => {
      this.inUseColours[0] = val;
    });
    this.storage.get('colour2').then((val) => {
      this.inUseColours[1] = val;
    });
    this.storage.get('colour3').then((val) => {
      this.inUseColours[2] = val;
      // set availble colours here once all promises have been resolved.
      this.getAvailableColours();
    });
  }

  /**
   * Get label variables from local DB
   */
  getLocalLabels() {
    this.storage.get('label1').then((val) => {
      this.labels[0] = val;
    });
    this.storage.get('label2').then((val) => {
      this.labels[1] = val;
    });
    this.storage.get('label3').then((val) => {
      this.labels[2] = val;
    });
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
  }
} // end class
