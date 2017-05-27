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

  createForm: FormGroup;

  tabBarElement: any;
  id: string;
  password: string;
  ip: string;
  constructor(public navCtrl: NavController, public builder: FormBuilder, public user: ValidateUser) {
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    this.createForm = this.builder.group({
      'id' : [this.id],
      'password' : [this.password]
    });

    this.getIP;
  }

  getIP(){
    this.ip = "192.168.1.254";
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
    this.user.loginUser(this.createForm.value);
  }

  /** This method pops to the root of the tab then switches to the home tab. */
  homePage() {
    this.navCtrl.popToRoot();
    this.navCtrl.parent.select(0);
  }

}
