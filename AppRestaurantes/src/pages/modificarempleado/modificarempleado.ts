import { CamareroPage } from './../camarero/camarero';
import { CocineroPage } from './../cocinero/cocinero';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modificarempleado',
  templateUrl: 'modificarempleado.html',
})
export class ModificarempleadoPage {

  employee= {password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,private restaurantService:RestaurantProvider, private menu:MenuController) {
    if(this.restaurantService.session.tipoEmpleado=="Cocinero"){
      this.menu.enable(true, 'menu3');
    }
  }

  modify_employee(){
    this.restaurantService.modify_employee(this.employee)
    .subscribe(()=>{
        if(this.restaurantService.session.tipoEmpleado=="Cocinero"){
          this.navCtrl.setRoot(CocineroPage);
        }else{
          this.navCtrl.setRoot(CamareroPage);
        }
    });
  }

}
