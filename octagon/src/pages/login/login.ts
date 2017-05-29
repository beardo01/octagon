import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { JoinPage } from '../join/join';
import { TabsPage } from '../tabs/tabs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateUser } from '../../providers/validate-user';
import { LocalColoursAndLabels } from '../../providers/local-colours-and-labels';
import { AlertController } from 'ionic-angular';
//import { CreateFormValidator } from '../../validators/createForm';


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

  constructor(public navCtrl: NavController, public builder: FormBuilder, public validateUser: ValidateUser, public localColoursAndLabels: LocalColoursAndLabels, 
              public alertCtrl: AlertController) {
    if (document.querySelector('.tabbar')) {
      this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }

    this.loginForm = this.builder.group({
      'id' : [this.id,Validators.compose([Validators.required])],
      'password' : [this.password, Validators.compose([Validators.minLength(6), Validators.required])]
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
    this.submitAttempt = true;
    // add ip address - To implement!@!#R@#URGIO#UFVOUYEVH J
    var sendValue = this.loginForm.value;
    sendValue.ip = this.ip;

    this.validateUser.loginUser(sendValue).toPromise().then( response => {
      if (response.success) {
      // Succesfully logged in. Get users data
        this.validateUser.setLocalClientKey(response.data.client_key);
        // colour array
        var colourArr = []
            colourArr.push(response.data.colours.colour_one);
            colourArr.push(response.data.colours.colour_two);
            colourArr.push(response.data.colours.colour_three);
            this.localColoursAndLabels.setStorageColours(colourArr)
            this.localColoursAndLabels.setProviderColours(colourArr);
          // label array
          var labelArr = []
            labelArr.push(response.data.labels.label_one);
            labelArr.push(response.data.labels.label_two);
            labelArr.push(response.data.labels.label_three);
            this.localColoursAndLabels.setStorageLabels(labelArr);
            this.localColoursAndLabels.setProviderLabels(labelArr);
            

            // READ IN NEK 10 DAYS OF BLOODY EVENTS m8

            // REDIRECT New user
            this.navCtrl.setRoot(TabsPage);
          } else {
            // Display error message from server
            this.presentAlert(response.data)
          }
        })
    }
    
  presentAlert(errorMessage: string) {
    let alert = this.alertCtrl.create({
      title: 'Error during registration',
      message: errorMessage,
      buttons: ['Dismiss']
    });
    alert.present();
}

}