import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';


@Injectable()
export class UsersProvider {

  login_correcto=false;
  users:any;
  session:any;

  logueado=false;

  //Guardamos la info del usuario que se acaba de loguear.
  infouser:any;

  reservasusuario:any;

  constructor(public http: HttpClient, private alertCtrl:AlertController, public storage:Storage) {
   
  }
 

  login_user(data){
    let url="api/login";

    return this.http.post(url,data,{responseType:'json'})
      .map(resp=>{
        //si entra, significa que el nick no existe.
        if(resp==='Login incorrecto'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Nick y/o contraseña incorrectos",
            buttons:["OK"]
          }).present();
        }else if(resp==='Login incorrecto'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Nick y/o contraseña incorrectos",
            buttons:["OK"]
          }).present();
        }else{
          console.log("Login correcto");
          this.logueado=true;
          this.login_correcto=true;
          //guardamos la informacion del usuario
          this.session=resp;
          //Guardar en el storage
          this.storage.set('idUsuario', this.session.idUsuario);
          this.storage.set('token', this.session.token);


        }
      })
  }

 

  mostrar_todos_usuarios(){

    let url="api/users";
    this.storage.get('token').then((val) => {
    this.http.get(url,{headers: {'token-acceso':val}})
      .subscribe(data=>{
        //guardamos en la variable restaurantes el data que nos devuelve la petición a la API
        this.users=data;
    });
  });
  }

  borrar_usuario(id)
  {
    let url="api/users/";

    this.http.delete(url+id,{headers: {'token-acceso':this.session.token}})
    .subscribe(data=>{
      this.mostrar_todos_usuarios();
    });

  }



}
