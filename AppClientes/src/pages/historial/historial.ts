import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { PedidosAntiguosPage } from './../pedidos-antiguos/pedidos-antiguos';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public userService:UsersProvider, public restaurantService: RestaurantsProvider) {
    //this.userService.mis_reservas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }

  verpedido(id){
    this.userService.reservation=id;
    this.restaurantService.productospedido();
    this.navCtrl.push(PedidosAntiguosPage);
 
  }

}
