import { CartarestaurantePage } from './../cartarestaurante/cartarestaurante';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';


@IonicPage()
@Component({
  selector: 'page-agregarproducto',
  templateUrl: 'agregarproducto.html',
})
export class AgregarproductoPage {

  producto={nombre: '', precio: '', tipo: '',informacion:'',restauranteP:'',categoria:''}

  constructor(public navCtrl: NavController, public navParams: NavParams,public restaurantService:RestaurantProvider) {
    restaurantService.see_category();
  }

  add_producto(){
    this.producto.restauranteP=this.restaurantService.session.idRestaurante;
    this.restaurantService.add_producto(this.producto)
      .subscribe(()=>{
        if(this.restaurantService.anyadir_producto==true){
          this.navCtrl.push(CartarestaurantePage);
        }
    });
  }

}
