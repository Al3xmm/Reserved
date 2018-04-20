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
  busquedaciudad:any;
  busquedatipo:any;
  restauranteactual:any;
  productoscategoria:any;
  allcategorias:any;
  avanzada:any;
  cantidad:any;
  productopedido:any;
  botontodosrestaurantes:boolean=false;
  suma:number=0;
  masinfoproductoactual:any;

  constructor(public http: HttpClient,public storage:Storage, public userService: UsersProvider) {
    //descomentar la siguiente linea si queremos que solo carge los restaurantes una vez
    //this.mostrar_todos();
  }

  mostrar_todos(){

    let url="api/allrestaurants";

    this.http.get(url)
      .subscribe(data=>{
        //guardamos en la variable restaurantes el data que nos devuelve la petición a la api
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
  productos_porcategoria(id){
    let url = "api/restaurants/";
    this.http.get(url+this.restauranteactual+"/products/"+"category/"+id,{headers:{'token-acceso':this.userService.session.token}})
    .subscribe(data=>{
      this.productoscategoria =data;
    })
  }

  masinfoproducto(id){
    let url = "api/restaurants/allproducts/";
    this.http.get(url+id,{headers:{'token-acceso':this.userService.session.token}})
    .subscribe(data=>{
      this.masinfoproductoactual=data;
    })

  }

  busqueda_avanzada(data){
    let url="api/restaurants/find";
    return this.http.post(url,data,{headers: {'token-acceso':this.userService.session.token}})
    .map(data=>{
      this.restaurantes=data;
  });
  }

  buscar_restaurante(termino){
    let url="api/restaurants/name/";
      this.http.get(url+termino,{headers: {'token-acceso':this.userService.session.token}}).subscribe(data=>{
        this.busqueda=data;
        //console.log(this.busqueda);
    });
  }

  buscar_tiporestaurante(termino){
    let url="api/restaurants/type/";
      this.http.get(url+termino,{headers: {'token-acceso':this.userService.session.token}}).subscribe(data=>{
        this.busqueda=data;
        //console.log(buscar);
    });
  }
  buscar_ciudadrestaurante(termino){
    let url="api/restaurants/city/";
      this.http.get(url+termino,{headers: {'token-acceso':this.userService.session.token}}).subscribe(data=>{
        this.busqueda=data;
        //console.log(buscar);
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

  categorias_restaurante(){
    let url="api/restaurants/";
    this.storage.get('token').then((val) => {
      this.http.get(url+this.restauranteactual+"/category",{headers: {'token-acceso':val}}).subscribe(data=>{
        this.allcategorias=data;
        console.log(this.allcategorias);
      });
    });
  }

  productospedido(){
    console.log(this.userService.reservation);
    let url="api/restaurants/orders/";
        this.http.get(url+this.userService.reservation+"/orderproducts",{headers: {'token-acceso':this.userService.session.token}}).subscribe(data=>{
          this.productopedido=data;
          this.cantidad=this.productopedido.length;
          this.sumatotal();
          console.log(this.productopedido);
    });
  }
  
  eliminar_plato(id,idproducto){
    console.log(idproducto);
    console.log(this.userService.reservation);
    let url="api/restaurants/orders/";
    this.http.delete(url+this.userService.reservation+"/orderproducts/"+id,{headers: {'token-acceso':this.userService.session.token}}).subscribe(data=>{
      this.productospedido();
    });

  }
  sumatotal(){
    this.suma=0;
    for(let i=0;i<this.cantidad;i++){
      this.suma=this.suma+this.productopedido[i].precio;
    }
    console.log(this.suma);
  }
  anyadir_precio_productodepedido(idpedido,idproducto){
    let url="api/restaurants/currentorders/";
    this.http.get(url+idpedido+"/deleteproduct/"+idproducto,{headers: {'token-acceso':this.userService.session.token}}).subscribe(data=>{
      console.log("probando");
    }); 
  }
  sumar_precio(idproducto){
    let url="api/restaurants/currentorders/";
    this.http.get(url+this.userService.reservation+"/addproduct/"+idproducto,{headers: {'token-acceso':this.userService.session.token}}).subscribe(data=>{
      console.log("porque");
    }); 
  }

}
