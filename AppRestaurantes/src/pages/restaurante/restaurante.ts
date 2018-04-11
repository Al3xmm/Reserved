import { Camera } from '@ionic-native/camera';
import { PreviewImagePage } from './../preview-image/preview-image';
import { ModidifcarrestaurantePage } from './../modidifcarrestaurante/modidifcarrestaurante';
import { InformacionPage } from './../informacion/informacion';
import { ReservasPage } from './../reservas/reservas';
import { ComentariosPage } from './../comentarios/comentarios';
import { CartarestaurantePage } from './../cartarestaurante/cartarestaurante';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ListaempleadosPage } from '../listaempleados/listaempleados';

import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-restaurante',
  templateUrl: 'restaurante.html',
})
export class RestaurantePage {

  images: any=[];
  urlfotoprincipal:any;

  constructor(public navCtrl: NavController,private camera: Camera, public navParams: NavParams, public storage: Storage, private restaurantService: RestaurantProvider, private menu: MenuController, private modalCtrl: ModalController,private actionSheetCtrl: ActionSheetController) {
    this.menu.enable(true, 'menu2');
    //this.restaurantService.get_imagenprincipal();
    this.url_foto();

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
 
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      let modal = this.modalCtrl.create('SubirimgprincipalPage', { data: imagePath });
      modal.present();
      modal.onDidDismiss(data => {
        if (data && data.reload) {
          this.navCtrl.setRoot(RestaurantePage);
        }
      });
    }, (err) => {
      console.log('Error: ', err);
    });
  }




  openImage() {
    //this.navCtrl.push(PreviewImagePage);
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "http://reserved.ovh/apireserved/"+this.restaurantService.session.idRestaurante+"/imageprincipal" });
    modal.present();
  }

  url_foto(){
    this.urlfotoprincipal="https://reserved.ovh/apireserved/"+this.restaurantService.session.idRestaurante+"/imageprincipal";
  }

  modificar_restaurante(){
    this.navCtrl.setRoot(ModidifcarrestaurantePage);
  }

  mis_empleados(){
    this.restaurantService.mis_empleados();
    this.navCtrl.setRoot(ListaempleadosPage);
  }

  mi_carta(){
    this.restaurantService.mi_carta();
    this.navCtrl.setRoot(CartarestaurantePage);
  }

  mis_comentarios(){
    this.restaurantService.mis_comentarios();
    this.navCtrl.setRoot(ComentariosPage);
  }

  mis_reservas(){
    this.navCtrl.setRoot(ReservasPage);
  }

  mi_informacion(){
    this.navCtrl.setRoot(InformacionPage);
  }

}
