import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PedidoProvider } from './../../providers/pedido/pedido';
/**
 * Generated class for the MipedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mipedido',
  templateUrl: 'mipedido.html',
})
export class MipedidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public pedidoService: PedidoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MipedidoPage');
  }

}
