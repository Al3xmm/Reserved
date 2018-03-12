import { CartarestaurantePage } from './../cartarestaurante/cartarestaurante';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';


@IonicPage()
@Component({
  selector: 'page-modificarproducto',
  templateUrl: 'modificarproducto.html',
})
export class ModificarproductoPage {

  producto={nombre: '', precio: '', tipo: '',informacion:'',restauranteP:'',categoria:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider) {
    restaurantService.see_category();
  }

  modify_producto(){
    this.producto.restauranteP=this.restaurantService.session.idRestaurante;
    this.restaurantService.modify_producto(this.producto)
      .subscribe(()=>{
        if(this.restaurantService.modificar_producto==true){
          this.navCtrl.setRoot(CartarestaurantePage);
        }
    });
  }

}
