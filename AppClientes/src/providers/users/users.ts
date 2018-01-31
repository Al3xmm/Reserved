import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';


@Injectable()
export class UsersProvider {

  login_correcto=false;

  session:any;

  logueado=false;

  //Guardamos la info del usuario que se acaba de loguear.
  infouser:any;

  constructor(public http: HttpClient, private alertCtrl:AlertController, public storage:Storage) {
    
  }

  add_user(data){
    let url="api/adduser";

    return this.http.post(url, data, {responseType: 'json'} )
      .map(resp=>{
        //si entra, significa que el nick ya esta siendo utilizado por otro usuario.
        if(resp==='"Nick no disponible"'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Nick ya en uso",
            buttons:["OK"]
          }).present();
        }else{
          console.log("Usuario creado");
          this.logueado=true;
          this.login_correcto=true;
          //guardamos la informacion del usuario
          this.session=resp;
          //Guardar en el storage
          this.storage.set('idUsuario', this.session.idUsuario);
          this.storage.set('token', this.session.token);
        };

      })

  }


  login_user(data){
    let url="api/login";

    return this.http.post(url,data,{responseType:'json'})
      .map(resp=>{
        //si entra, significa que el nick no existe.
        if(resp==='Usuario no encontrado'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Usuario no encontrado",
            buttons:["OK"]
          }).present();
        }else if(resp==='Contraseña errónea'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Contraseña errónea",
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

  user_profile(id){
    let url="api/users/";
    
    this.http.get(url+id).subscribe(data=>{
      this.infouser=data;
    });

  }



}
