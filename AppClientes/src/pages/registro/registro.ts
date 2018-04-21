import { AllrestaurantsPage } from './../allrestaurants/allrestaurants';
import { UsersProvider } from './../../providers/users/users';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user= { nick: '', password: '', email: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, private userService:UsersProvider,private restaurantService:RestaurantsProvider) {
  }


  add_user() {
    let confirm = this.alertCtrl.create({
      title: '¿Registrarse en Reserved?',
      message: '¿Aceptas las condiciones de uso de Reserved?',
      buttons: [
        {
          text: 'Acepto',
          handler: () => {
            this.userService.add_user(this.user)
            .subscribe(()=>{
              if(this.userService.login_correcto==true){
                console.log('Se registro');
                this.restaurantService.mostrar_todos();
                this.navCtrl.setRoot(AllrestaurantsPage);
              }
          });
          }
        },
        {
          text: 'No acepto',
          handler: () => {
            console.log('No se registro');
          }
        },

      ]
    });
    confirm.present();
  }
  /*
  add_user() {
    this.userService.add_user(this.user)
      .subscribe(()=>{
        if(this.userService.login_correcto==true){
          this.navCtrl.setRoot(AllrestaurantsPage);
        }
    });
   
  }*/

}
