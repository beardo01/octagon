import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JoinPage } from '../join/join';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateFormValidator } from '../../validators/createForm';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  createForm: FormGroup;

  tabBarElement: any;

  email: string;
  password: string;

  constructor(public navCtrl: NavController, public builder: FormBuilder) {
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    this.createForm = this.builder.group({
      'email' : [this.email],
      'password' : [this.password]
    });
  }

  /** This will stop the nav bar from showing when entering this page. */
  ionViewWillEnter() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'none';
    }
  }

  /** Shows the nav bar when leaving the page. */
  ionViewWillLeave() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'flex';
    }
  }

  /** Moves to the join page. */
  joinPage() {
    this.navCtrl.push(JoinPage);
  }

  add(){
    console.log("Form Submission");
    console.log(this.createForm.value);
  }

  /** This method pops to the root of the tab then switches to the home tab. */
  homePage() {
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(0);
  }

}
