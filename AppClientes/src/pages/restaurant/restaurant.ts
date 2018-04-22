import { ReservarPage } from './../reservar/reservar';
import { CartaPage } from './../carta/carta';
import { PedirPage } from './../pedir/pedir';
import { ComentariosPage } from './../comentarios/comentarios';
import { Component , ViewChild ,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, Platform } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { MiscategoriasPage } from './../miscategorias/miscategorias';
import { CategoriaspedidoPage } from '../categoriaspedido/categoriaspedido';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@IonicPage()

@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantsProvider, private modalCtrl:ModalController,private toastCtrl:ToastController, private geolocation:Geolocation) { 
    
  }

  ionViewDidLoad(){
    //this.getPosition();
    this.loadMap();
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
  createRange2(number1){
    var number=5-number1;
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
/*
  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }
*/

  loadMap(/*position: Geoposition*/){
    var aux= this.restaurantService.inforestaurante[0].coordenadas.split("_");
    let latitude =parseFloat(aux[0]) ;
    let longitude = parseFloat(aux[1]);
    
    let mapEle: HTMLElement = document.getElementById('map');
  
    
    let myLatLng = {lat: latitude, lng: longitude};
  
    // crear mapa
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Mapa'
      });
      mapEle.classList.add('show-map');
    });
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
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "api/"+id+"/imageprincipal" });
    modal.present();
  }
  openImagesec1(id) {
    //this.navCtrl.push(PreviewImagePage);
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "api/"+id+"/imagesec1" });
    modal.present();
  }
  openImagesec2(id) {
    //this.navCtrl.push(PreviewImagePage);
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "api/"+id+"/imagesec2" });
    modal.present();
  }
  openImagesec3(id) {
    //this.navCtrl.push(PreviewImagePage);
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "api/"+id+"/imagesec3" });
    modal.present();
  }

}
