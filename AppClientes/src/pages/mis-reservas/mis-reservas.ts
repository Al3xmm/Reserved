import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { ModificarReservaPage } from './../modificar-reserva/modificar-reserva';
import { PedidosAntiguosPage } from './../pedidos-antiguos/pedidos-antiguos';
/**
 * Generated class for the MisReservasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-reservas',
  templateUrl: 'mis-reservas.html',
})
export class MisReservasPage {
  eliminar={dia: '', turno:'', restaurante:''}
  public buttonClicked: boolean = false;
  public buttonClicked2: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider,public restaurantService: RestaurantsProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisReservasPage');
  }
  historial(){
    this.userService.mis_reservas();
    this.navCtrl.setRoot(MisReservasPage);
    this.userService.botonhistorial=false;
    this.buttonClicked2 = !this.buttonClicked2;
  }
  pendientes(){
    this.userService.reservasfuturas()
    this.navCtrl.setRoot(MisReservasPage);
    this.userService.botonpendientes=false;
    this.buttonClicked = !this.buttonClicked;
  }
  modificar_reserva(id){
    this.userService.reservaactual=id;
    this.navCtrl.push(ModificarReservaPage);
  }
  eliminar_reserva(id){
    console.log(id);
    var i=0;
    for(i=0;i<this.userService.reservafutura.length;i++){
      this.eliminar.restaurante=this.userService.reservafutura[i].idRestaurante;
      this.eliminar.dia=this.userService.reservafutura[i].dia;
      this.eliminar.turno=this.userService.reservafutura[i].turno;
    }
    this.userService.eliminar_reserva(id,this.eliminar);
    this.navCtrl.push(MisReservasPage);
  }
  verpedido(id){
    this.userService.reservation=id;
    this.restaurantService.productospedido();
    this.navCtrl.push(PedidosAntiguosPage);
 
  }
}
