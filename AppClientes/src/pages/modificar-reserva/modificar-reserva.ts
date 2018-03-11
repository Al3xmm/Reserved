import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { UsersProvider } from './../../providers/users/users';
import { PerfilPage } from './../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-modificar-reserva',
  templateUrl: 'modificar-reserva.html',
})
export class ModificarReservaPage {
  reserva={dia: '', hora: '', comensales: '', turno:'', restauranter:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider, public restaurantService:RestaurantsProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificarReservaPage');
  }

  modificar_reserva(){
    this.reserva.restauranter=this.userService.reservafutura[0].idRestaurante;
    console.log(this.reserva.restauranter);
    this.userService.modify_reserva(this.reserva)
      .subscribe(()=>{
          this.navCtrl.setRoot(PerfilPage);
    });
  }
}
