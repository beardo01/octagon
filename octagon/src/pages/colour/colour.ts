import { Component , ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SassHelperComponent } from "../../providers/sass-helper/sass-helper.component";
/*
  Generated class for the Colour page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-colour',
  templateUrl: 'colour.html'
})
export class ColourPage {
  @ViewChild(SassHelperComponent)
  private sassHelper: SassHelperComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ColourPage');
  }
  getTextColour(){
    console.log (this.sassHelper.readProperty('text-color'));
  }
}
