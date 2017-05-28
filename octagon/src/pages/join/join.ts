import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../../providers/register-user';

@Component({
  selector: 'page-join',
  templateUrl: 'join.html'
})
export class JoinPage {
  tabBarElement: any;
  scrollContent: any;

  submitAttempt: boolean = false;

  joinForm: FormGroup;

  name: string;
  email: string;
  password: string;
  rpassword: string;
  password_same: boolean;

  constructor(public navCtrl: NavController, public builder: FormBuilder, public registerUser: RegisterUser) {
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }
    this.scrollContent = document.querySelector('.scroll-content');

    this.joinForm = this.builder.group({
      'name': [this.name, Validators.compose([Validators.pattern('[a-zA-Z]+[a-zA-Z0-9_-]*'), Validators.required])],
      'email': [this.email, Validators.compose([Validators.pattern('.+@.+[.].+'), Validators.required])],
      'password': [this.password, Validators.compose([Validators.minLength(6), Validators.required])],
      'rpassword': [this.rpassword, Validators.compose([Validators.minLength(6), Validators.required])]
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

  /** Moves back to the signin page. */
  signInPage() {
    this.navCtrl.pop(JoinPage);
  }

  /** This method pops to the root of the tab then switches to the home tab. */
  join() {
    this.submitAttempt = true;
    console.log("Form Submission");
    console.log(this.joinForm.value);
    if (this.password === this.rpassword) {
      if (this.joinForm.valid) {

        console.log("PASS");
<<<<<<< HEAD
        console.log("register user join form");
        this.registerUser.registerUser(this.joinForm.value)
        
        this.navCtrl.popToRoot();
        this.navCtrl.parent.select(0);
=======
        this.navCtrl.pop();
>>>>>>> d3b53a4b4b15051f162b52dfcc8c60ff54e7522c
      } else {
        console.log("FAILED");
      }
    } else {
      this.password_same = false;
      console.log("FAILED");
    }
  }

}