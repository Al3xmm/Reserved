import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-carta',
  templateUrl: 'carta.html',
})
export class CartaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartaPage');
  }

  entrantes(){
        this.restaurantService.productos_porcategoria("entrantes");  
  }

  postres(){
        this.restaurantService.productos_porcategoria("postres"); 
  }

  platosprincipales(){
        this.restaurantService.productos_porcategoria("platos principales");
  }

  menus(){
        this.restaurantService.productos_porcategoria("menus");   
  }

  bebidas(){
   // for(let item of this.restaurantService.productosrestaurante){
     // if(item.categoria == 'bebidas'){
        this.restaurantService.productos_porcategoria("bebidas");
  }
}
