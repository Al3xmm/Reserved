import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from './../perfil/perfil';
import { UsersProvider } from './../../providers/users/users';
/**
 * Generated class for the ModificarperfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificarperfil',
  templateUrl: 'modificarperfil.html',
})
export class ModificarperfilPage {
  usuario={password: '', email: ''}

  constructor(public navCtrl: NavController, public navParams: NavParams,public userService: UsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificarperfilPage');
  }
  modify_user(){
  this.userService.modify_user(this.usuario)
    .subscribe(()=>{
      if(this.userService.modificar_perfil==true){
        this.navCtrl.setRoot(PerfilPage);
      }
  });
}
}
