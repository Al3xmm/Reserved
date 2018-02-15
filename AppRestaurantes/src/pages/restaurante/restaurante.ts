import { ComentariosPage } from './../comentarios/comentarios';
import { CartarestaurantePage } from './../cartarestaurante/cartarestaurante';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ListaempleadosPage } from '../listaempleados/listaempleados';

@IonicPage()
@Component({
  selector: 'page-restaurante',
  templateUrl: 'restaurante.html',
})
export class RestaurantePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private restaurantService: RestaurantProvider) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantePage');
  }

  mis_empleados(){
    this.restaurantService.mis_empleados();
    this.navCtrl.push(ListaempleadosPage);
  }

  mi_carta(){
    this.restaurantService.mi_carta();
    this.navCtrl.push(CartarestaurantePage);
  }

  mis_comentarios(){
    this.restaurantService.mis_comentarios();
    this.navCtrl.push(ComentariosPage);
  }

}
