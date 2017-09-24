import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController } from 'ionic-angular';
import { ClearLocalStorage } from '../../providers/clear-local-storage';
import { UserLocalStorage } from '../../providers/user-local-storage';
import { Http, Headers } from '@angular/http';
//import { TabsPage } from '../tabs/tabs';

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

  constructor(public navCtrl: NavController, public builder: FormBuilder, public http: Http, 
              public alertCtrl: AlertController, public localStorage: UserLocalStorage, public clearStorage: ClearLocalStorage) {
    
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
    this.clearStorage.clearLocalStorage();

    this.submitAttempt = true;
    if (this.password === this.rpassword) {
      if (this.joinForm.valid) {
        let headers: Headers =  new Headers();
        headers.set('Content-Type', 'application/json');
        let userData = {
          'username': this.joinForm.value.name,
          'email': this.joinForm.value.email,
          'password': this.joinForm.value.password,
          'first_name': "",
          'last_name': ""
        };  
          this.http.post('http://0.0.0.0:8000/users/', JSON.stringify(userData), {headers: headers})
          .map(res => 
            res.json())
            .subscribe( response => {
              if (response.success) {
                // Succesfully register user. Set local storage up!
                //this.localStorage.setClientKey(response.data.client_key);
                this.localStorage.setLocalColours(response.data.colours);
                this.localStorage.setLocalLabels(response.data.labels);
                this.localStorage.setLocalID(response.data.id);
                this.localStorage.setUsername(response.data.username);
                this.navCtrl.pop();
              } else {
                this.presentAlert(response.data);
              }
            },
            err => {
                console.log('server return error when trying to register user')
            })                 
          } 
      } else {
        this.password_same = false;
    }
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