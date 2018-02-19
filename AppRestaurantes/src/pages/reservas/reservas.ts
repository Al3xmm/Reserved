import { MostrarreservasPage } from './../mostrarreservas/mostrarreservas';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html',
})
export class ReservasPage {

  reservas={dia: ''}

  constructor(public navCtrl: NavController, public navParams: NavParams,public restaurantService:RestaurantProvider) {
  }

  see_reservas(){
    this.restaurantService.see_reservas(this.reservas)
      .subscribe(()=>{
          this.navCtrl.push(ReservasPage);
    });
  }

  mostrar_reservas(dia,turno){
    this.restaurantService.mostrar_reservas(dia,turno);
    this.navCtrl.push(MostrarreservasPage);
  }

}
