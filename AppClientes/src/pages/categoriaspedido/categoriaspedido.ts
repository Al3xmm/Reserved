import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { CartaPage} from './../carta/carta';
import { PedirPage} from './../pedir/pedir';
/**
 * Generated class for the CategoriaspedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoriaspedido',
  templateUrl: 'categoriaspedido.html',
})
export class CategoriaspedidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  public restaurantService: RestaurantsProvider) {
    restaurantService.categorias_restaurante();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaspedidoPage');
  }
  mis_productos(id){
    this.restaurantService.productos_porcategoria(id);
    //console.log(id);
    this.navCtrl.push(PedirPage);
  }

}
