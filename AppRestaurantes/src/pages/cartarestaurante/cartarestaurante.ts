import { ModificarproductoPage } from './../modificarproducto/modificarproducto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { AgregarproductoPage } from '../agregarproducto/agregarproducto';


@IonicPage()
@Component({
  selector: 'page-cartarestaurante',
  templateUrl: 'cartarestaurante.html',
})
export class CartarestaurantePage {

  public buttonClicked: boolean = false;

  categoria={nombre: ''}

  constructor(public navCtrl: NavController, public navParams: NavParams,public restaurantService:RestaurantProvider, private menu:MenuController,private loadingCtrl:LoadingController) {
    this.menu.enable(true, 'menu2');
  }


  eliminar_producto(id){
    this.restaurantService.eliminar_producto(id);
    this.navCtrl.push(CartarestaurantePage);
  }

  agregar_producto(){
    this.navCtrl.push(AgregarproductoPage);
  }
  
  modificar_producto(id) {
    this.restaurantService.producto_id(id);
    this.restaurantService.productoactual=id;
    let loading = this.loadingCtrl.create({
      content: 'Cargando...',
      duration: 500,
    });

    loading.onDidDismiss(() => {
      this.navCtrl.push(ModificarproductoPage);
    });

    loading.present();
  }

  mostrar_formulario(){
    this.buttonClicked = !this.buttonClicked;
  }

  crear_categoria(){
    this.restaurantService.add_category(this.categoria)
      .subscribe(()=>{
        this.navCtrl.push(CartarestaurantePage);
    });
    
  }

}
