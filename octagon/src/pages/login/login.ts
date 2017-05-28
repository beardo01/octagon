import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { JoinPage } from '../join/join';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateUser } from '../../providers/validate-user';
//import { CreateFormValidator } from '../../validators/createForm';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;

  tabBarElement: any;
  id: string;
  password: string;
  ip: string;
  invalid: boolean;

  constructor(public navCtrl: NavController, public builder: FormBuilder, public user: ValidateUser) {
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    this.loginForm = this.builder.group({
      'id' : [this.id],
      'password' : [this.password]
    });

    this.getIP();
  }

  getIP(){
    this.ip = "127.0.0.1";
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

  authenticate(){
    // add ip address - To implement!@!#R@#URGIO#UFVOUYEVH J
    var sendValue = this.loginForm.value;
    sendValue.ip = this.ip;

    this.user.loginUser(sendValue).subscribe( result => {
      if (!this.user.getValid()) {
        this.invalid = true;
      } else {
        this.invalid = false;
        // successfully logged in go to homepage.
        this.homePage()
      }
    })
  }

  /** This method pops to the root of the tab then switches to the home tab. */
  homePage() {
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(0);
  }

}