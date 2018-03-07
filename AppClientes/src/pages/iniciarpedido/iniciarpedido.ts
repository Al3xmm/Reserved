import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { CategoriaspedidoPage } from '../categoriaspedido/categoriaspedido';

/**
 * Generated class for the IniciarpedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iniciarpedido',
  templateUrl: 'iniciarpedido.html',
})
export class IniciarpedidoPage {
  pin={pin:'',usuarior:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider,public restaurantService:RestaurantsProvider) {
    userService.reservasconfirmadas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciarpedidoPage');
  }
  comprobar_pin(){
      this.pin.usuarior = this.userService.session.idUsuario;
      this.userService.add_pin(this.pin).subscribe(()=>{
        if(this.userService.nuevopin==true){
          this.navCtrl.setRoot(IniciarpedidoPage);
        }
    });
  }
  iniciarpedido(){
      //faltaria filtrar solamente habria una reserva, falta metodo de una reserva dada su id con la hora maybe
        this.userService.pedido_actual(this.userService.reservaconfirmada[0].idReserva);
        if(this.userService.reservation!=undefined){
          this.restaurantService.categorias_restaurante();
          this.navCtrl.push(CategoriaspedidoPage);
    }
  }
  iniciarpedidopin(){
    //faltaria filtrar solamente habria una reserva, falta metodo de una reserva dada su id con la hora maybe
      this.userService.pedido_actual(this.userService.reservaconfirmada[0].idReserva);
      if(this.userService.reservation!=undefined){
        this.restaurantService.categorias_restaurante();
        this.navCtrl.push(CategoriaspedidoPage);
  }
}
}
