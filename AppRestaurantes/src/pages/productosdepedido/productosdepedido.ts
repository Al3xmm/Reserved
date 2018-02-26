import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';

@IonicPage()
@Component({
  selector: 'page-productosdepedido',
  templateUrl: 'productosdepedido.html',
})
export class ProductosdepedidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider) {
  }

  eliminar_productodepedido(id,idproducto){
    this.restaurantService.eliminar_productodepedido(id,idproducto);
    this.navCtrl.push(ProductosdepedidoPage);
  }

}
