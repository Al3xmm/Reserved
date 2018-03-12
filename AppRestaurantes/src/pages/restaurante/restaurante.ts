import { InformacionPage } from './../informacion/informacion';
import { ReservasPage } from './../reservas/reservas';
import { ComentariosPage } from './../comentarios/comentarios';
import { CartarestaurantePage } from './../cartarestaurante/cartarestaurante';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ListaempleadosPage } from '../listaempleados/listaempleados';

@IonicPage()
@Component({
  selector: 'page-restaurante',
  templateUrl: 'restaurante.html',
})
export class RestaurantePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private restaurantService: RestaurantProvider, private menu: MenuController) {
    this.menu.enable(true, 'menu2');
  }

  mis_empleados(){
    this.restaurantService.mis_empleados();
    this.navCtrl.setRoot(ListaempleadosPage);
  }

  mi_carta(){
    this.restaurantService.mi_carta();
    this.navCtrl.setRoot(CartarestaurantePage);
  }

  mis_comentarios(){
    this.restaurantService.mis_comentarios();
    this.navCtrl.setRoot(ComentariosPage);
  }

  mis_reservas(){
    this.navCtrl.setRoot(ReservasPage);
  }

  mi_informacion(){
    this.navCtrl.setRoot(InformacionPage);
  }

}
