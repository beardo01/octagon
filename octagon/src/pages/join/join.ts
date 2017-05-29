import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../../providers/register-user';
import { ValidateUser } from '../../providers/validate-user';
import { LocalColoursAndLabels } from '../../providers/local-colours-and-labels';
import { AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public builder: FormBuilder, public registerUser: RegisterUser, 
              public validateUser: ValidateUser, public localColoursAndLabels: LocalColoursAndLabels, public alertCtrl: AlertController) {
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
  presentAlert(errorMessage: string) {
    let alert = this.alertCtrl.create({
      title: 'Error during registration',
      message: errorMessage,
      buttons: ['Dismiss']
    });
    alert.present();
}

  /** This method pops to the root of the tab then switches to the home tab. */
  join() {
    this.submitAttempt = true;
    if (this.password === this.rpassword) {
      if (this.joinForm.valid) {
        this.registerUser.registerUser(this.joinForm.value).toPromise().then( response =>{
          if (response.success) {
            // Succesfully register user. Set local storage up!
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
        
            // REDIRECT New user
            this.navCtrl.popToRoot();
          } else {
            // Display error message from server
            this.presentAlert(response.data)

          } 
        })
      } else {
        console.log("FAILED");
      }
    } else {
      this.password_same = false;
      console.log("FAILED");
    }
  }

}