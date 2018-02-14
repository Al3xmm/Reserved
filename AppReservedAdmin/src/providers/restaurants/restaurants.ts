import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable()
export class RestaurantsProvider {

  restaurantes:any;
  inforestaurante:any;
  comentariosrestaurante:any;
  productosrestaurante:any;

  restauranteactual:number;

  constructor(public http: HttpClient,public storage:Storage) {
    //descomentar la siguiente linea si queremos que solo carge los restaurantes una vez
    this.mostrar_todos();
  }

  mostrar_todos(){

    let url="api/allrestaurants";
    
    this.http.get(url)
      .subscribe(data=>{
        //guardamos en la variable restaurantes el data que nos devuelve la petición a la API
        this.restaurantes=data;
    });

  }

  restaurante_id(id){
    this.restauranteactual=id;
    let url="api/restaurants/";
    this.storage.get('token').then((val) => {
      this.http.get(url+id,{headers: {'token-acceso':val}}).subscribe(data=>{
        this.inforestaurante=data;
      });
    });
    
  }

  comentarios_restaurante(id){
    let url="api/restaurants/";
    this.storage.get('token').then((val) => {
      this.http.get(url+id+"/comments",{headers: {'token-acceso':val}}).subscribe(data=>{
        this.comentariosrestaurante=data;
      });
    });
  }

 
  
  borrar_restaurante(id)
  {
    let url="api/restaurants/";

    this.storage.get('token').then((val) => {
    this.http.delete(url+id,{headers: {'token-acceso':val}}).subscribe(data=>{
      this.mostrar_todos();
    });
  });

  }

}
