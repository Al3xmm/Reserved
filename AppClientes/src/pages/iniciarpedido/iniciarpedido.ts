import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { CategoriaspedidoPage } from '../categoriaspedido/categoriaspedido';
import { ProductospedidoPage } from '../productospedido/productospedido';

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
  usuario={usuarioR:''}
  pin={pin:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider,public restaurantService:RestaurantsProvider) {
    userService.reservasconfirmadas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IniciarpedidoPage');
  }
  comprobar_pin(){
      this.userService.add_pin(this.pin).subscribe(()=>{
        if(this.userService.nuevopin==true){
          this.iniciarpedidopin();
        }
    });
  }
  iniciarpedido(){
        this.userService.pedido_actual(this.userService.reservaconfirmada[0].idReserva);
        //if(this.userService.reservation!=undefined){
          this.restaurantService.restauranteactual=this.userService.reservaconfirmada[0].idRestaurante;
          this.navCtrl.push(CategoriaspedidoPage);
          this.restaurantService.categorias_restaurante();
    //}
  }

  iniciarpedidopin(){
    this.restaurantService.restauranteactual=this.userService.pininfo[0].restauranteR;
          this.usuario.usuarioR=this.userService.session.idUsuario;
          this.userService.reservapinactual=this.userService.pininfo[0].idReserva;
          console.log(this.usuario.usuarioR);
          console.log(this.userService.reservapinactual);
          this.userService.modificarpin(this.userService.reservapinactual,this.usuario).subscribe(()=>{
              this.navCtrl.push(CategoriaspedidoPage);
              this.restaurantService.categorias_restaurante();
  });
       
}
  verpedido(id){
    this.userService.pedido_actual(id);
    if(this.userService.idpedido==true){
      this.restaurantService.productospedido();
      this.navCtrl.setRoot(ProductospedidoPage);
    }
  }
}
