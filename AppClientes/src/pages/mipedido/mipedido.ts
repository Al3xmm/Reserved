import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PedidoProvider } from './../../providers/pedido/pedido';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { UsersProvider } from './../../providers/users/users';
import { MisReservasPage } from './../mis-reservas/mis-reservas';
/**
 * Generated class for the MipedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mipedido',
  templateUrl: 'mipedido.html',
})
export class MipedidoPage {
  pedido ={pedidop: '', productop: '', tipoproducto: '', hora:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public pedidoService: PedidoProvider,public userService: UsersProvider,public restaurantService: RestaurantsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MipedidoPage');
  }

  add_reserva(){
    //this.pedido.pedidop=this.restaurantService.restauranteactual; la dificultad es pasar el idpedido de appRestaurantes a appClientes
    //this.pedido.productop=this.pedidoService.plato; El problema es que tengo que sacar solo el id de plato ver video.
    //this.pedido.hora = hora de ahora mismo ver en ionic docs
    //Como cojones se el tipo de producto
    this.userService.add_reserva(this.pedido)
      .subscribe(()=>{
        if(this.userService.nuevopedido==true){
          this.navCtrl.setRoot(MisReservasPage);
        }
    });
  }
}
