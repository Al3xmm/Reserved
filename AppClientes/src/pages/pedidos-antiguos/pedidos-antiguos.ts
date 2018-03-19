import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';

/**
 * Generated class for the PedidosAntiguosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-antiguos',
  templateUrl: 'pedidos-antiguos.html',
})
export class PedidosAntiguosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public restaurantService: RestaurantsProvider) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosAntiguosPage');
  }


}
