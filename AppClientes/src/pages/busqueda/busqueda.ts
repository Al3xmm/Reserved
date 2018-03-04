import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { RestaurantPage } from './../restaurant/restaurant';
/**
 * Generated class for the BusquedaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {
  busqueda = {nombre: '', ciudad:'', tipoComida:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantsProvider) {
    restaurantService.inforestaurante();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusquedaPage');
  }
  ver_restaurante(id){
    this.restaurantService.restaurante_id(id);
    this.restaurantService.comentarios_restaurante(id);
    this.navCtrl.push(RestaurantPage);
  }
}
