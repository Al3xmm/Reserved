import { ReservarPage } from './../reservar/reservar';
import { CartaPage } from './../carta/carta';
import { PedirPage } from './../pedir/pedir';
import { ComentariosPage } from './../comentarios/comentarios';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { MiscategoriasPage } from './../miscategorias/miscategorias';
import { CategoriaspedidoPage } from '../categoriaspedido/categoriaspedido';


@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantsProvider, private modalCtrl:ModalController) { 

  }

  ver_carta(){
    this.restaurantService.categorias_restaurante();
    this.navCtrl.push(MiscategoriasPage);
  }

  reservar(){
    this.navCtrl.push(ReservarPage);
  }
  comentar(){
    this.navCtrl.push(ComentariosPage);
  }
  iniciarpedido(){
    this.restaurantService.categorias_restaurante();
    this.navCtrl.push(CategoriaspedidoPage);
  }
  openImageprincipal(id) {
    //this.navCtrl.push(PreviewImagePage);
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "http://localhost:3000/"+id+"/imageprincipal" });
    modal.present();
  }
  openImagesec1(id) {
    //this.navCtrl.push(PreviewImagePage);
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "http://localhost:3000/"+id+"/imagesec1" });
    modal.present();
  }
  openImagesec2(id) {
    //this.navCtrl.push(PreviewImagePage);
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "http://localhost:3000/"+id+"/imagesec2" });
    modal.present();
  }
  openImagesec3(id) {
    //this.navCtrl.push(PreviewImagePage);
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "http://localhost:3000/"+id+"/imagesec3" });
    modal.present();
  }

}
