import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { PedidoProvider } from './../../providers/pedido/pedido';
import { MipedidoPage } from './../mipedido/mipedido';

/**
 * Generated class for the PedirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedir',
  templateUrl: 'pedir.html',
})
export class PedirPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantsProvider, public pedidoService: PedidoProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedirPage');
  }

  verpedido(){
    this.navCtrl.push(MipedidoPage);
  }
}
