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
  }

  ionViewDidLoad(){

    /// play around with this to get user auto logging in
    if (this.localStorage.clientKey != null || this.localStorage.clientKey != undefined) {
      // if we have a client key user doesnt need to re log in so get their data and redirect
      this.getEvents()
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
    this.submitAttempt = true;
   
    let headers: Headers =  new Headers();
    headers.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    headers.append('Content-Type', 'application/json');
    let userData = {
      'id': this.loginForm.value.id,
      'password': this.loginForm.value.password,
      'ip': '127.0.0.1'
    };
      this.http.post('https://api.simpalapps.com/driver/get/user', JSON.stringify(userData), {headers: headers})
      .map(res => 
        res.json())
      .subscribe( response => {
          if (response.success) {
            this.localStorage.setClientKey(response.data.client_key);
            this.localStorage.setLocalColours(response.data.colours);
            this.localStorage.setLocalLabels(response.data.labels);
            // call local method to read in the next 10 days of events
            this.getEvents();
            
        } else {
        // display error message to user
        this.presentAlert(response.data);
      }
      
      },
      err => {
        console.log("Something went wrong with authenticate request")
      })
  }
  /**
   * Called when user successfully logs in
   * send post request away to API and get users events
   * 
   */
  getEvents() {
  var start = moment().startOf('day').unix();
  let eventHeaders: Headers =  new Headers();
    eventHeaders.set('auth_key', '9C73815A3C9AA677B379EB69BDF19');
    eventHeaders.append('client_key', this.localStorage.clientKey);
    eventHeaders.append('Content-Type', 'application/json');
    let body = {
      'from': start
    };
    this.http.post('https://api.simpalapps.com/driver/get/events', JSON.stringify(body), {headers:eventHeaders})
    .map(res => res.json())
      .subscribe(response => {
        if (response.success) {
          this.localStorage.events = response.data;
          this.localStorage.setLocalEvents(response.data);
          this.navCtrl.setRoot(TabsPage);
        } else {
          // display error message to user
          this.presentAlert(response.data)
        }
      },
      err => {
          console.log("Something went wrong with your getEvents request")
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