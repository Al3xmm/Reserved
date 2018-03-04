import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { CategoriaspedidoPage } from '../categoriaspedido/categoriaspedido';
/**
 * Generated class for the IniciarpedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iniciarpedido',
  templateUrl: 'iniciarpedido.html',
})
export class IniciarpedidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider,public restaurantService:RestaurantsProvider) {
    userService.mis_reservas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciarpedidoPage');
  }
  iniciarpedido(){
      //faltaria filtrar solamente habria una reserva, falta metodo de una reserva dada su id con la hora maybe
        this.userService.reserva_actual(this.userService.reservasusuario[0].idReserva);
        if(this.userService.reservation!=undefined){
          this.restaurantService.categorias_restaurante();
          this.navCtrl.push(CategoriaspedidoPage);
    }
  }
}
