import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { JoinPage } from '../join/join';
<<<<<<< HEAD
import { ValidateUser } from '../../providers/validate-user';
=======
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateFormValidator } from '../../validators/createForm';

>>>>>>> abfe4360221add2faeb1dc579e2b501cba617560

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  createForm: FormGroup;

  tabBarElement: any;

<<<<<<< HEAD
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: ValidateUser) {
=======
  email: string;
  password: string;

  constructor(public navCtrl: NavController, public builder: FormBuilder) {
>>>>>>> abfe4360221add2faeb1dc579e2b501cba617560
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    this.createForm = this.builder.group({
      'email' : [this.email,Validators.compose([Validators.pattern('.+@.+[.].+'), Validators.minLength(3),Validators.required])],
      'password' : [this.password,Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9]'), Validators.minLength(6),Validators.required])]
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
