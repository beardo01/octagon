import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateFormValidator } from '../../validators/createForm';

@Component({
  selector: 'page-join',
  templateUrl: 'join.html'
})
export class JoinPage {
  tabBarElement: any;
  scrollContent: any;

  createForm: FormGroup;

  name: string;
  email: string;
  password: string;
  rpassword: string;

  constructor(public navCtrl: NavController, public builder: FormBuilder) {
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }
    this.scrollContent = document.querySelector('.scroll-content');

    this.createForm = this.builder.group({
      'name' : [this.name],
      'email' : [this.email],
      'password' : [this.password],
      'rpassword' : [this.rpassword]
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
  homePage() {
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(0);
  }

  add(){
    console.log("Form Submission");
    console.log(this.createForm.value);
  }

}