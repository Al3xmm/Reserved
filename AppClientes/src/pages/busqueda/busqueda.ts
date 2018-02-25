import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusquedaPage');
  }
  busquedaavanzada(){
    this.restaurantService.busqueda_avanzada(this.busqueda)
  }
  /*
  buscarpornombre(){
    this.restaurantService.buscar_restaurante(this.busqueda.nombre);
  }
  buscarportipo(ev:any){
    let tipo = "asdas";
    this.restaurantService.buscar_ciudadrestaurante(tipo);
    //this.navCtrl.setRoot(AllusersPage);
  }
  buscarporciudad(){
    let ciudad = "asdas";
    this.restaurantService.buscar_ciudadrestaurante(ciudad);
    //this.navCtrl.setRoot(AllusersPage);
  }*/
}
