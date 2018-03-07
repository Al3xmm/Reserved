import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { RestaurantPage } from './../restaurant/restaurant';


@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {
  busqueda = {nombre: '', ciudad:'', tipoComida:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantsProvider) {

  }

  ionViewDidLoad() {
    
  }
  ver_restaurante(id){
    this.restaurantService.restaurante_id(id);
    this.restaurantService.comentarios_restaurante(id);
    this.navCtrl.push(RestaurantPage);
  }
}
