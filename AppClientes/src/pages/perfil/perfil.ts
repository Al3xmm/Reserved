import { MisReservasPage } from './../mis-reservas/mis-reservas';
import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ModificarperfilPage } from './../modificarperfil/modificarperfil';
import { ModificarReservaPage } from './../modificar-reserva/modificar-reserva';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  eliminar={dia: '', turno:'', restaurante:''}
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public userService:UsersProvider) {
    storage.get('idUsuario').then((val) => {
      storage.get('token').then((val2) => {
        userService.user_profile(val,val2);
      });
    });
    userService.reservasfuturas();
  }



  mis_reservas(){
    this.userService.mis_reservas();
    this.navCtrl.push(MisReservasPage);
  }
  modificarperfil(){
    this.navCtrl.push(ModificarperfilPage);
  }
  modificar_reserva(id){
    this.userService.reservaactual=id;
    this.navCtrl.push(ModificarReservaPage);
  }
  eliminar_reserva(id){
    var i=0;
    for(i=0;i<this.userService.reservafutura.legth;i++){
      this.eliminar.restaurante=this.userService.reservafutura[i].idRestaurante;
      this.eliminar.dia=this.userService.reservafutura[i].dia;
      this.eliminar.turno=this.userService.reservafutura[i].turno;
    }
    this.userService.eliminar_reserva(this.eliminar,id);
    this.navCtrl.push(PerfilPage);
  }
}
