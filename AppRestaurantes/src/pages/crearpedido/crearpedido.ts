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

  pedido={reservap: '', asignare: '', cuentatotal:0 ,mesa:'',dia:'',finalizado:0}

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider) {
  }


  add_pedido(){
    this.pedido.asignare=this.restaurantService.session.idEmpleado;
    if(this.pedido.reservap==''){
      this.pedido.reservap=null;
    }

    var date = new Date();
    var currentdate=date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    this.pedido.dia=currentdate;
  
    this.restaurantService.add_pedido(this.pedido)
      .subscribe(()=>{
          this.navCtrl.push(EmpleadoPage);
    });

  }

}
