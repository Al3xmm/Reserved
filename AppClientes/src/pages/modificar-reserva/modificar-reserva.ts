import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { UsersProvider } from './../../providers/users/users';
import { PerfilPage } from './../perfil/perfil';

/**
 * Generated class for the ModificarReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificar-reserva',
  templateUrl: 'modificar-reserva.html',
})
export class ModificarReservaPage {
  reserva={dia: '', hora: '', comensales: '', turno:'', restauranter:'',usuarior:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider, public restaurantService:RestaurantsProvider) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificarReservaPage');
  }

  modificar_reserva(){
    this.reserva.restauranter=this.restaurantService.restauranteactual;
    this.reserva.usuarior=this.userService.session.idUsuario;
    this.userService.modify_reserva(this.reserva)
      .subscribe(()=>{
        if(this.userService.nuevareserva==true){
          this.navCtrl.setRoot(PerfilPage);
        }
    });
  }
}
