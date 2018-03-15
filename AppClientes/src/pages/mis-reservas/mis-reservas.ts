import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

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
  public buttonClicked: boolean = false;
  public buttonClicked2: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider) {
    if(userService.botonhistorial==true){
      this.buttonClicked2 = !this.buttonClicked2;
    }
    if(userService.botonpendientes==true){
      this.buttonClicked = !this.buttonClicked;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisReservasPage');
  }
  historial(){
    this.userService.mis_reservas();
    this.navCtrl.setRoot(MisReservasPage);
    this.userService.botonhistorial=false
  }
  pendientes(){
    this.userService.reservasfuturas();
    this.navCtrl.setRoot(MisReservasPage);
    this.userService.botonpendientes=false
  }
}
