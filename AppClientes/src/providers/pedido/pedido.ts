import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the PedidoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PedidoProvider {
  plato:any[]=[];

  constructor(public http: HttpClient, public storage:Storage, private alertCtrl:AlertController) {
    console.log('Hello PedidoProvider Provider');
  }

  agregarpedido(item:any) {
    this.plato.push(item);
    this.alertCtrl.create({
      title:"Producto añadido al pedido",
      buttons:["ok"]
    }).present();
  }

  eliminarplato(num){
    this.plato.splice(num,1);
  }
  
}
