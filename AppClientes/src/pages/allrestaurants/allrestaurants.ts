import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';


@IonicPage()
@Component({
  selector: 'page-allrestaurants',
  templateUrl: 'allrestaurants.html',
})
export class AllrestaurantsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private restaurantService:RestaurantsProvider) {
    //Si dejo esta linea aqui, cada vez que entremos a esta paguina, hara un get de restaurantes. Si la ponemos en restaurants.ts, solo lo hará una vez  (poner arriba el restaurants provider)
    //restaurantservice.mostrar_todos();
  }

  ionViewDidLoad() {
    
  }

}
