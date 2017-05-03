import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Labels page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-label',
  templateUrl: 'label.html'
})
export class LabelPage {

  label1 : string = "Hey";
  label2 : string = "Man";
  label3 : string = "What's up";
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabelPage');
  }

}
