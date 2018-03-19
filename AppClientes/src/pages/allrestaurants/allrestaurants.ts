import { RestaurantPage } from './../restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';


@IonicPage()
@Component({
  selector: 'page-allrestaurants',
  templateUrl: 'allrestaurants.html',
})
export class AllrestaurantsPage {

  busqueda = {nombre: '', ciudad:'', tipoComida:''}

  public buttonClicked: boolean = false;
  public buttonClicked2: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private restaurantService:RestaurantsProvider) {
    //Si dejo esta linea aqui, cada vez que entremos a esta paguina, hara un get de restaurantes. Si la ponemos en restaurants.ts, solo lo hará una vez  (poner arriba el restaurants provider)
    //restaurantservice.mostrar_todos();
    if(restaurantService.botontodosrestaurantes==true){
      this.buttonClicked2 = !this.buttonClicked2;
    }
  }

  ver_restaurante(id){
    this.restaurantService.restaurante_id(id);
    this.restaurantService.comentarios_restaurante(id);
    this.navCtrl.push(RestaurantPage);
  }

  busquedaavanzada(){
    this.restaurantService.busqueda_avanzada(this.busqueda)
    .subscribe(()=>{
      this.restaurantService.botontodosrestaurantes=true;
      this.navCtrl.setRoot(AllrestaurantsPage);
    });
  }

  todos_restaurantes(){
    this.restaurantService.mostrar_todos();
    this.navCtrl.setRoot(AllrestaurantsPage);
    this.restaurantService.botontodosrestaurantes=false;
  }

  mostrar_formulario(){
    this.buttonClicked = !this.buttonClicked;
  }
  mostrar_formulario1(){
    this.buttonClicked2 = !this.buttonClicked2;
  }

}
