import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { UsersProvider } from '../users/users';
import { Geolocation } from '@ionic-native/geolocation';


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
  cantidadplato:any;
  productopedido:any;
  botontodosrestaurantes:boolean=false;
  suma:number=0;
  masinfoproductoactual:any;
  total:number=1;
  cantitat:any[]=[];
  reducido:any[]=[];
  idproducto:any[]=[];
  filtro:string='proximidad';

  constructor(public http: HttpClient,public storage:Storage, public userService: UsersProvider,private geolocation:Geolocation) {
    //descomentar la siguiente linea si queremos que solo carge los restaurantes una vez
    //this.mostrar_todos();
  }

  comprobar_valoracion(){
    let i=0;
    for(i=0;i<this.restaurantes.length;i++){
      if(this.restaurantes[i].media==null){
        this.restaurantes[i].media=0;
        this.restaurantes[i].comentarios=0;
      }
    }
  }

  comprobar_valoracionfiltro(){
    let i=0;
    for(i=0;i<this.restaurantes.length;i++){
      if(this.restaurantes[i].media==null){
        this.restaurantes[i].media=0;
        this.restaurantes[i].comentarios=0;
      }
    }
    this.restaurantes.sort(function(a, b) {
      return parseFloat(b.media) - parseFloat(a.media);
    });
  }

  mostrar_todos_novedades(){
    this.restaurantes=null;
    let url="api/allrestaurants";
    this.http.get(url)
      .subscribe(data=>{
        //guardamos en la variable restaurantes el data que nos devuelve la petición a la api
        this.restaurantes=data;
        this.restaurantes.sort(function(a, b) {
          return parseFloat(b.idRestaurante) - parseFloat(a.idRestaurante);
        });
        this.comprobar_valoracion();
    });

  }

  mostrar_todos_valoracion(){
    this.restaurantes=null;
    let url="api/allrestaurants";
    this.http.get(url)
      .subscribe(data=>{
        //guardamos en la variable restaurantes el data que nos devuelve la petición a la api
        this.restaurantes=data;
        this.comprobar_valoracionfiltro();
    });

  }

  mostrar_todos(){
    this.restaurantes=null;
    let url="api/allrestaurants";
    this.http.get(url)
      .subscribe(data=>{
        //guardamos en la variable restaurantes el data que nos devuelve la petición a la api
        this.restaurantes=data;
        this.comprobar_valoracion();
        this.mostrar_por_distancia();
    });

  }

  mostrar_por_distancia(){
    let i=0;
    for(i=0;i<this.restaurantes.length;i++){
      var aux= this.restaurantes[i].coordenadas.split("_");
      let latitude =parseFloat(aux[0]) ;
      let longitude = parseFloat(aux[1]);
      this.restaurantes[i].distancia=this.applyHaversine(latitude,longitude);
    }

    this.restaurantes.sort(function(a, b) {
      return parseFloat(a.distancia) - parseFloat(b.distancia);
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
      console.log(this.masinfoproductoactual);
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
  this.total=0;
    console.log(this.userService.reservation);
    let url="api/restaurants/orders/";
        this.http.get(url+this.userService.reservation+"/orderproducts",{headers: {'token-acceso':this.userService.session.token}}).subscribe(data=>{
          this.productopedido=data;
          this.cantidad=this.productopedido.length;
          this.sumatotal();  
          this.productopedido.sort(function(a, b) {
            return parseFloat(b.idProductoDePedido) - parseFloat(a.idProductoDePedido);
          }); 
          var i=0;
          for(i=0;i<this.productopedido.length;i++){
            this.productopedido[i].cantidad=1;
          }
          this.agrupar_productos();  
          console.log("prueba");
    });
  }

  productospedidoagrupados=[];
  agrupar_productos(){
    this.productospedidoagrupados=[];
    var i=0;
    var j=0;
    var para=false;
    for(i=0;i<this.productopedido.length;i++){
      if(this.productospedidoagrupados.length!=0){
        for(j=0;j<this.productospedidoagrupados.length;j++){
          if(para==false){
            if(this.productopedido[i].IdProducto==this.productospedidoagrupados[j].IdProducto){
              this.productospedidoagrupados[j].cantidad=this.productospedidoagrupados[j].cantidad+1;
              para=true;
            }
          }
        }
        if(para==false){
          this.productospedidoagrupados.push(this.productopedido[i]);
          para=true;
        }
      }else{
        this.productospedidoagrupados.push(this.productopedido[i]);
      }
      para=false;
    }
    console.log(this.productopedido);
  }
  
  eliminar_plato(id,idproducto){
    console.log(idproducto);
    console.log(id);
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

  valoracionmedia:any;

  valoracion_media(id){
    let url="api/restaurants/";
      this.http.get(url+id+"/valorationcomments",{headers: {'token-acceso':this.userService.session.token}}).subscribe(data=>{
        this.valoracionmedia=data[0].valoracion/data[0].comentarios;
    });
  }

  distancia:any;
  posicionactual:any;

  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.posicionactual=response;
    })
    .catch(error =>{
      console.log(error);
    })
  }
 
  applyHaversine(lat,lng){

      let usersLocation = {
          lat: this.posicionactual.coords.latitude,
          lng: this.posicionactual.coords.longitude
      };

      let placeLocation = {
          lat:lat,
          lng:lng
      };

      this.distancia = this.getDistanceBetweenPoints(
          usersLocation,
          placeLocation,
          'miles'
      ).toFixed(2);

      return this.distancia;

  }

  getDistanceBetweenPoints(start, end, units){

      let earthRadius = {
          miles: 3958.8,
          km: 6371
      };

      let R = earthRadius[units || 'miles'];
      let lat1 = start.lat;
      let lon1 = start.lng;
      let lat2 = end.lat;
      let lon2 = end.lng;

      let dLat = this.toRad((lat2 - lat1));
      let dLon = this.toRad((lon2 - lon1));
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;

      let kilometros=d*1.60934;

      return kilometros;

  }

  toRad(x){
      return x * Math.PI / 180;
  }

}
