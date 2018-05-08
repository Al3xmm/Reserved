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
  cantidadplato:any;
  productopedido:any;
  botontodosrestaurantes:boolean=false;
  suma:number=0;
  masinfoproductoactual:any;
  total:number=1;
  cantitat:any[]=[];
  reducido:any[]=[];
  idproducto:any[]=[];

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
          for(let i=0;i<this.productopedido.length;i++){
              this.idproducto[i]=this.productopedido[i].IdProducto;
              console.log(this.idproducto);//10,10,12,12,20 vector de idproductos. Falta reducir el vector quitar repetidos ¿Nueva funcion?
            }
            for(let i=0;i<this.productopedido.length;i++){
              for(let x=0; x<this.idproducto.length;x++){
                if(this.productopedido[i].IdProducto==this.idproducto[x]){//Vamos comparando si el numero del vector nuevo sale en el antiguo, si es asi ++
                  this.total++;
                  console.log(this.total);
              }
            }
            this.cantitat[i]=this.total;//guardamos en un nuevo array los totales de esos id que sales para el vector (10,10,12,12,20) sale (2,2,2,2,1)
            this.total=0;//Lo ponemos 0 cuando vamos a la posicion i++
          }
            console.log(this.cantitat);
         /*eliminar repetidos
         for(let i=0;i<this.productopedido.length;i++){
			for(let j=0;j<this.productopedido.length-1;j++){
				if(i!=j){
					if(this.productopedido[i]==this.productopedido[j]){
						// eliminamos su valor
						this.productopedido[i]="";
					}
				}
			}
		}
 
		// mostramos unicamente los que tienen valor
		let n=this.productopedido.length;
		for (let k=0;k<=n-1;k++){
			if(this.productopedido[k]!=""){
			reducido[k]=this.productopedido[k];
			}
		}*/
          
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

  valoracionmedia:any;

  valoracion_media(id){
    let url="api/restaurants/";
      this.http.get(url+id+"/valorationcomments",{headers: {'token-acceso':this.userService.session.token}}).subscribe(data=>{
        this.valoracionmedia=data[0].valoracion/data[0].comentarios;
    });
  }

}
