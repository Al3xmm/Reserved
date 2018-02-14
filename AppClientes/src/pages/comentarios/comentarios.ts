import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { UsersProvider } from './../../providers/users/users';
import { RestaurantPage } from './../restaurant/restaurant';
/**
 * Generated class for the ComentariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {

comentario:{ contenido:'', fecha:'', usuarioC:'', restauranteC:''}
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider, public restaurantService:RestaurantsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComentariosPage');
  }
  add_comentario(){
  this.comentario.restauranteC=this.restaurantService.restauranteactual;
  this.comentario.usuarioC=this.userService.session.idUsuario;
  console.log(this.comentario.usuarioC);
  console.log(this.comentario.restauranteC);
  this.userService.add_comentario(this.comentario)
    .subscribe(()=>{
      if(this.userService.nuevacomentario==true){
        this.navCtrl.push(RestaurantPage);
      }
  });
}
}
