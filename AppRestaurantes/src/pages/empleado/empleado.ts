import { CrearpedidoPage } from './../crearpedido/crearpedido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-empleado',
  templateUrl: 'empleado.html',
})
export class EmpleadoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  crear_pedido(){
    this.navCtrl.push(CrearpedidoPage);
  }

}
