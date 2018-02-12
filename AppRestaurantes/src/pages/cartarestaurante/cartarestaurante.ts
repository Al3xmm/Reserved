import { ModificarproductoPage } from './../modificarproducto/modificarproducto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { AgregarproductoPage } from '../agregarproducto/agregarproducto';


@IonicPage()
@Component({
  selector: 'page-cartarestaurante',
  templateUrl: 'cartarestaurante.html',
})
export class CartarestaurantePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public restaurantService:RestaurantProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartarestaurantePage');
  }

  eliminar_producto(id){
    this.restaurantService.eliminar_producto(id);
    this.navCtrl.push(CartarestaurantePage);
  }

  agregar_producto(){
    this.navCtrl.push(AgregarproductoPage);
  }
  
  modificar_producto(id){
    this.restaurantService.producto_id(id);
    this.restaurantService.productoactual=id;
    this.navCtrl.push(ModificarproductoPage);
  }

}
