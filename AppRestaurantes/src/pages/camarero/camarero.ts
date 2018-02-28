import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { EmpleadoPage } from './../empleado/empleado';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-camarero',
  templateUrl: 'camarero.html',
})
export class CamareroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider) {
    
  }

  ver_pedidos(){
    this.navCtrl.setRoot(EmpleadoPage)
  }

  producto_entregado(idproducto){
    this.restaurantService.producto_entregado(idproducto);
    this.navCtrl.setRoot(CamareroPage);
  }

  doRefresh(refresher) {

    setTimeout(() => {
      this.restaurantService.see_productosaentregar();
      refresher.complete();
    }, 1000);
  }

}
