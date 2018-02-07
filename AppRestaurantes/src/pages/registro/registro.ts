import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  restaurant= { nombre: '', password: '', email: '',horario: '',descripcion: '',direccion: '',telefono: '',ciudad: '',aforo: '',tipoComida: '',coordenadas: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider) {
  }

  add_restaurant() {
    this.restaurantService.add_restaurant(this.restaurant)
      .subscribe(()=>{
        if(this.restaurantService.login_correcto==true){
          this.navCtrl.setRoot(LoginPage);
        }
    });
  }

}
