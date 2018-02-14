import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { UsersProvider } from '../users/users';


@Injectable()
export class RestaurantsProvider {

  nuevacomentario = false;
  restaurantes:any;
  inforestaurante:any;
  comentariosrestaurante:any;
  productosrestaurante:any;
  busqueda:any;
  busquedatipo:any;
  restauranteactual:any;

  constructor(public http: HttpClient,public storage:Storage, public userService: UsersProvider) {
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

  carta_restaurante(){
    let url="api/restaurants/";
    this.storage.get('token').then((val) => {
      this.http.get(url+this.restauranteactual+"/products",{headers: {'token-acceso':val}}).subscribe(data=>{
        this.productosrestaurante=data;
        console.log(data);
      });
    });
  }

  buscar_restaurante(termino){
    let url="api/restaurants/name/";
    this.storage.get('token').then((val) => {
      this.http.get(url+termino,{headers: {'token-acceso':val}}).subscribe(data=>{
        this.busqueda=data;
        //console.log(buscar);
      });
    });

  }

  buscar_tiporestaurante(termino){
    let url="api/restaurants/type/";
    this.storage.get('token').then((val) => {
      this.http.get(url+termino,{headers: {'token-acceso':val}}).subscribe(data=>{
        //this.busquedatipo=this.restaurantes;
        this.busquedatipo = data;
        console.log(this.busquedatipo);
      });
    });

  }
  add_comentario(data){
    let url = "api/comment/";
    return this.http.post(url,data, {headers: {'token-acceso':this.userService.session.token} , responseType:'text'})
    .map(resp=>{
      console.log("Comentario creado");
      this.nuevacomentario = true;
      this.comentarios_restaurante(this.restauranteactual);
    })


  }


}
