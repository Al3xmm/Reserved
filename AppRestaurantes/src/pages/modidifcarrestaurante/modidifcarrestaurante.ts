import { RestaurantePage } from './../restaurante/restaurante';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modidifcarrestaurante',
  templateUrl: 'modidifcarrestaurante.html',
})
export class ModidifcarrestaurantePage {

  restaurant= { nombre: '', password: '', email: '',horario: '',descripcion: '',direccion: '',telefono: '',ciudad: '',aforo: '',tipoComida: '',coordenadas: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider, private menu:MenuController, private modalCtrl:ModalController) {
    this.menu.enable(true, 'menu2');
  }

  modify_restaurant(){

    if(this.restaurantService.latlng!=undefined){
      this.restaurant.coordenadas=this.restaurantService.latlng;
    }
    
    this.restaurantService.modify_restaurant(this.restaurant)
    .subscribe(()=>{
        this.navCtrl.setRoot(RestaurantePage);
    });
  }

  openMap() {
    let modal = this.modalCtrl.create('MapaPage');
    modal.present();
  }



}
