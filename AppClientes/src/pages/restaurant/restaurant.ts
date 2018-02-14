import { ReservarPage } from './../reservar/reservar';
import { CartaPage } from './../carta/carta';
import { PedirPage } from './../pedir/pedir';
import { ComentariosPage } from './../comentarios/comentarios';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';



@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantsProvider) {

  }

  ver_carta(){
    this.restaurantService.carta_restaurante();
    this.navCtrl.push(CartaPage);
  }

  reservar(){
    this.navCtrl.push(ReservarPage);
  }
  comentar(){
    this.navCtrl.push(ComentariosPage);
  }
  iniciarpedido(){
    this.restaurantService.carta_restaurante();
    console.log("probando");
    this.navCtrl.push(PedirPage);
  }

}
