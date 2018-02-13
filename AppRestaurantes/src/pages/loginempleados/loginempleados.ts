import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantePage } from '../restaurante/restaurante';


@IonicPage()
@Component({
  selector: 'page-loginempleados',
  templateUrl: 'loginempleados.html',
})
export class LoginempleadosPage {

  empleado= { nick: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider) {
  }

  login_empleado(){
    this.restaurantService.login_empleado(this.empleado)
      .subscribe(()=>{
        if(this.restaurantService.login_correcto==true){
          this.navCtrl.setRoot(RestaurantePage);
        }
    });
  }

}
