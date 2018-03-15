import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { UsersProvider } from './../../providers/users/users';
import { PerfilPage } from './../perfil/perfil';


@IonicPage()
@Component({
  selector: 'page-reservar',
  templateUrl: 'reservar.html',
})
export class ReservarPage {
  reserva={dia: '', hora: '', comensales: '', turno:'', restauranter:'',usuarior:''}

  constructor(public navCtrl: NavController, public navParams: NavParams,  public userService:UsersProvider, public restaurantService:RestaurantsProvider) {
  }

  add_reserva(){
    var aux=this.reserva.hora.split(':');
    var aux2=parseInt(aux[0]);

    if(aux2<16){
      this.reserva.turno="Comida";
    }else{
      this.reserva.turno="Cena";
    }

    if(this.reserva.restauranter !=null){
      this.reserva.restauranter=this.restaurantService.restauranteactual;
      this.reserva.usuarior=this.userService.session.idUsuario;
      this.userService.add_reserva(this.reserva)
        .subscribe(()=>{
          if(this.userService.nuevareserva==true){
            this.navCtrl.setRoot(PerfilPage);
          }
      });
    }
    
  }
}
