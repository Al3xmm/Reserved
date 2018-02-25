import { EmpleadoPage } from './../empleado/empleado';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-crearpedido',
  templateUrl: 'crearpedido.html',
})
export class CrearpedidoPage {

  pedido={reservap: '', asignare: '', cuentatotal:0 ,mesa:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider) {
  }


  add_pedido(){
    this.pedido.asignare=this.restaurantService.session.idEmpleado;
    if(this.pedido.reservap==''){
      this.pedido.reservap=null;
    }

    console.log(this.pedido);

    this.restaurantService.add_pedido(this.pedido)
      .subscribe(()=>{
          this.navCtrl.push(EmpleadoPage);
    });
  }

}
