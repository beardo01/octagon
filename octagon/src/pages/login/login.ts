import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { JoinPage } from '../join/join';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

import { UserLocalStorage } from '../../providers/user-local-storage';
import { Http, Headers } from '@angular/http';
import * as moment from 'moment';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  submitAttempt: boolean = false;
  tabBarElement: any;
  id: string;
  password: string;
  ip: string;
  invalid: boolean;

  constructor(public navCtrl: NavController, public builder: FormBuilder, public alertCtrl: AlertController,
              public localStorage: UserLocalStorage , public http: Http ) {
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    this.loginForm = this.builder.group({
      'id' : [this.id,Validators.compose([Validators.required])],
      'password' : [this.password, Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }
  /** This will stop the nav bar from showing when entering this page. */
  ionViewWillEnter() {
    if (this.tabBarElement) {
      this.tabBarElement.style.display = 'none';
    }
    if(this.localStorage.username != null) {
      this.id = this.localStorage.username;
    }
  }

/*  ionViewDidLoad(){

    /// play around with this to get user auto logging in
    if (this.localStorage.clientKey != null || this.localStorage.clientKey != undefined) {
      // if we have a client key user doesnt need to re log in so get their data and redirect
      this.getEvents()
    }
  }*/


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
    this.submitAttempt = true;

    let headers: Headers =  new Headers();
    headers.append('Content-Type', 'application/json');
    let userData = {
      'username': this.loginForm.value.id,
      'password': this.loginForm.value.password
    };
      this.http.post('http://10.112.124.235:8000/auth/', JSON.stringify(userData), {headers: headers})
      .map(res =>
        res.json())
      .subscribe( response => {
          if (response.success) {
            //console.log("inside login trying to auth user")
            //console.log("logging response", response)
            this.localStorage.setClientKey(response.data.client_key);
            this.localStorage.setLocalColours(response.data.colours);
            this.localStorage.setLocalLabels(response.data.labels);
            this.localStorage.setLocalID(response.data.user_id);
            // call local method to read in the next 10 days of events
            this.getEvents();

        } else {
          // display error message to user
          this.presentAlert("Username or password is incorrect.");
        }
      },
      err => {
        this.presentAlert("Sever error. Please try again.")
      })
  }
  /**
   * Called when user successfully logs in
   * send post request away to API and get users events
   * var start = moment().startOf('day').unix();
   */
  getEvents() {
  let eventHeaders: Headers =  new Headers();
    eventHeaders.set('Authorization', 'Token ' + this.localStorage.clientKey);
    eventHeaders.append('Content-Type', 'application/json');
    this.http.get('http://10.112.124.235:8000/event/list_events/', {headers:eventHeaders})
    .map(res => res.json())
      .subscribe(response => {
        if (response.success) {
          console.log("get events")
          console.log(response)
          //this.localStorage.events = response.data;
          this.localStorage.setLocalEvents(response.detail);
          this.navCtrl.setRoot(TabsPage);
        } else {
          // display error message to user
          this.presentAlert(response.data)
        }
      },
      err => {
          this.presentAlert("Couldn't fetch events, please relogin")
      })
    }

  /**
   * Alert user indicating their issue
   * @param errorMessage, message to display
   */
  presentAlert(errorMessage: string) {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      message: errorMessage,
      buttons: ['Dismiss']
    });
    alert.present();
}


}
