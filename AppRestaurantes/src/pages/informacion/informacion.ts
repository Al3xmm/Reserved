import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-informacion',
  templateUrl: 'informacion.html',
})
export class InformacionPage {

  info={dia: ''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider, private menu:MenuController) {
    this.menu.enable(true, 'menu2');
  }

  see_informacion(){
    this.restaurantService.see_info(this.info.dia);
    
    this.navCtrl.setRoot(InformacionPage);
  }

}
