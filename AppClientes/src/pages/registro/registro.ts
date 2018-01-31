import { AllrestaurantsPage } from './../allrestaurants/allrestaurants';
import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user= { nick: '', password: '', email: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, private userService:UsersProvider) {
  }


  add_user() {
    this.userService.add_user(this.user)
      .subscribe(()=>{
        if(this.userService.login_correcto==true){
          this.navCtrl.setRoot(AllrestaurantsPage);
        }
    });
   
  }

}
