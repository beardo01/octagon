import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-join',
  templateUrl: 'join.html'
})
export class JoinPage {
  tabBarElement: any;
  scrollContent: any;

  joinForm: FormGroup;
  valid: boolean;
  name: string;
  email: string;
  password: string;
  rpassword: string;

  constructor(public navCtrl: NavController, public builder: FormBuilder) {
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }
    this.scrollContent = document.querySelector('.scroll-content');

    this.joinForm = this.builder.group({
      'name' : [this.name, Validators.compose([Validators.pattern('[a-zA-Z]+[a-zA-Z0-9_-]*'), Validators.required])],
      'email' : [this.email, Validators.compose([Validators.pattern('.+@.+[.].+'), Validators.required])],
      'password' : [this.password, Validators.compose([Validators.required])],
      'rpassword' : [this.rpassword, Validators.compose([Validators.required])]
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
    console.log("Form Submission");
    console.log(this.joinForm.value);
    if (this.joinForm.valid) {
      this.valid = true;
      console.log("WIN");
      this.navCtrl.popToRoot();
      this.navCtrl.parent.select(0);
    } else {
      this.valid = false;
      console.log("FAILED");
    }
  }

}