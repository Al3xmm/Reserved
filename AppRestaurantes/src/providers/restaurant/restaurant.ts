import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';


@Injectable()
export class RestaurantProvider {

  login_correcto=false;
  logueado=false;

  //info del login
  session:any;

  //datos del restaurante logueado
  inforestaurant:any;

  //empleados del restaurante logueado
  empleadosrestaurante:any;

  agregar_correcto=false;

  //carta del restaurante logueado
  cartarestaurante:any;

  anyadir_producto=false;

  modificar_producto=false;

  //idproducto que queremos modificar
  productoactual:any;

  //informacion producto a modificar
  infoproductoactual:any;

  constructor(public http: HttpClient, private alertCtrl: AlertController, public storage:Storage) {
    
  }

  add_restaurant(data){
    let url="api/addrestaurant";

    return this.http.post(url, data, {responseType: 'json'} )
      .map(resp=>{
        //si entra, significa que el email ya esta siendo utilizado por otro usuario.
        console.log(resp);
        if(resp==='Email no disponible'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Email ya en uso",
            buttons:["OK"]
          }).present();
        }else{
          console.log("Restaurante creado");
          this.logueado=true;
          this.login_correcto=true;
          //guardamos la informacion del usuario
          this.session=resp;
          //Guardar en el storage
          this.storage.set('idRestaurante', this.session.idRestaurante);
          this.storage.set('token', this.session.token);
        };

      })
  }

  login_restaurant(data){
    let url="api/loginrestaurant";

    return this.http.post(url,data,{responseType:'json'})
      .map(resp=>{
        //si entra, significa que el nick no existe.
        if(resp==='Login incorrecto'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Email y/o contraseña incorrectos",
            buttons:["OK"]
          }).present();
        }else if(resp==='Login incorrecto'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Email y/o contraseña incorrectos",
            buttons:["OK"]
          }).present();
        }else{
          console.log("Login correcto");
          this.logueado=true;
          this.login_correcto=true;
          //guardamos la informacion del usuario
          this.session=resp;
          //Guardar en el storage
          this.storage.set('idRestaurante', this.session.idRestaurante);
          this.storage.set('token', this.session.token);

          this.restaurant_profile(this.session.idRestaurante,this.session.token);


        }
      })
  }

  login_empleado(data){
    let url="api/loginempleado";

    return this.http.post(url,data,{responseType:'json'})
    .map(resp=>{
      
      if(resp==='Login incorrecto'){
        this.alertCtrl.create({
          title:"Error",
          subTitle:"Usuario y/o contraseña incorrectos",
          buttons:["OK"]
        }).present();
      }else if(resp==='Login incorrecto'){
        this.alertCtrl.create({
          title:"Error",
          subTitle:"Usuario y/o contraseña incorrectos",
          buttons:["OK"]
        }).present();
      }else{
        console.log("Login correcto");
        this.logueado=true;
        this.login_correcto=true;
        //guardamos la informacion del usuario
        this.session=resp;
        //Guardar en el storage
        this.storage.set('idEmpleado', this.session.idRestaurante);
        this.storage.set('token', this.session.token);

        //this.restaurant_profile(this.session.idRestaurante,this.session.token);


      }
    })
  }


  restaurant_profile(id,token){
    let url="api/restaurants/";
    this.http.get(url+id,{headers: {'token-acceso':token}}).subscribe(data=>{
      this.inforestaurant=data;
    });

  }

  mis_empleados(){
    let url="api/restaurants/";

    this.storage.get('idRestaurante').then((val) => {
      this.storage.get('token').then((val2) => {
        this.http.get(url+val+"/employee",{headers: {'token-acceso':val2}}).subscribe(data=>{
          this.empleadosrestaurante=data;
        });
      });
    });

  }

  eliminar_empleado(id){
    let url="api/restaurants/";

    this.http.delete(url+this.session.idRestaurante+"/employee/"+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.mis_empleados();
    });

  }

  add_empleado(data){
    let url="api/restaurants/";

    return this.http.post(url+this.session.idRestaurante+"/employee", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          console.log("Empleado Creado");
          this.mis_empleados();
          this.agregar_correcto=true;

      })
  }

  mi_carta(){
    let url="api/restaurants/";

    this.http.get(url+this.session.idRestaurante+"/products",{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.cartarestaurante=data;
    });
  }

  eliminar_producto(id){
    let url="api/restaurants/";

    this.http.delete(url+this.session.idRestaurante+"/products/"+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.mi_carta();
    });
  }

  add_producto(data){
    let url="api/restaurants/";

    return this.http.post(url+this.session.idRestaurante+"/products", data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          console.log("Producto Añadido");
          this.mi_carta();
          this.anyadir_producto=true;

      })
  }

  modify_producto(data){
    let url="api/restaurants/";

    return this.http.put(url+this.session.idRestaurante+"/products/"+ this.productoactual, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          console.log("Producto Actualizado");
          this.mi_carta();
          this.modificar_producto=true;

      })

  }

  producto_id(id){
    let url="api/restaurants/allproducts/";

    this.http.get(url+id,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.infoproductoactual=data;
    });

  }

}
