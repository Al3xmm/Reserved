import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { CartaPage} from './../carta/carta';
import { PedirPage} from './../pedir/pedir';

@IonicPage()
@Component({
  selector: 'page-miscategorias',
  templateUrl: 'miscategorias.html',
})
export class MiscategoriasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MiscategoriasPage');
  }
  mis_productos(id){
    this.restaurantService.productos_porcategoria(id);
    //console.log(id);
    this.navCtrl.push(CartaPage);
  }
}
