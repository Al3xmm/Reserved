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
}
