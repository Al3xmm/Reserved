import { AllrestaurantsPage } from './../allrestaurants/allrestaurants';
import { RegistroPage } from './../registro/registro';
import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //objeto creado con nick y password que estará disponible en el login.html
  user= { nick: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,private userservice:UsersProvider) {

  }

  showRegistroPage() {
    this.navCtrl.push(RegistroPage);
  }

  login_user(){
    this.userservice.login_user(this.user)
      .subscribe(()=>{
        if(this.userservice.login_correcto==true){
          this.navCtrl.setRoot(AllrestaurantsPage);
        }
    });
  }

}
