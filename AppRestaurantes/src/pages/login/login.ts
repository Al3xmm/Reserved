import { RegistroPage } from './../registro/registro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { RestaurantePage } from '../restaurante/restaurante';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  restaurant= { email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantService:RestaurantProvider) {
  }

  showRegistroPage() {
    this.navCtrl.push(RegistroPage);
  }

  login_restaurant(){
    this.restaurantService.login_restaurant(this.restaurant)
      .subscribe(()=>{
        if(this.restaurantService.login_correcto==true){
          this.navCtrl.setRoot(RestaurantePage);
        }
    });
  }

}
