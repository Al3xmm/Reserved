import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { CategoriaspedidoPage } from './../categoriaspedido/categoriaspedido';
import { AllrestaurantsPage } from './../allrestaurants/allrestaurants';
import { UsersProvider } from '../../providers/users/users';
/**
 * Generated class for the ProductospedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productospedido',
  templateUrl: 'productospedido.html',
})
export class ProductospedidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public restaurantService:RestaurantsProvider,public pedidoService:PedidoProvider,public userService:UsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductospedidoPage');
  }

  anayadirplato(){
    this.restaurantService.restauranteactual=this.userService.reservaconfirmada[0].idRestaurante;
    console.log(this.userService.reservaconfirmada[0].idRestaurante);
    this.restaurantService.categorias_restaurante();
    this.navCtrl.setRoot(CategoriaspedidoPage);
  }
  pedirCuenta(){
    this.alertCtrl.create({
    title:"Cuenta pedida",
    subTitle:"El camarero le traera la cuenta enseguida, gracias por su visita",
    buttons:["OK"]
  }).present();
  this.navCtrl.setRoot(AllrestaurantsPage);
  }
  eliminarplato(id){
    this.restaurantService.eliminar_plato(id);
    this.navCtrl.push(ProductospedidoPage);
  }
}
