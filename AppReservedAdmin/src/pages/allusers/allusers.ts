import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Storage } from '@ionic/storage';
import { UsuarioeliminadoPage } from '../usuarioeliminado/usuarioeliminado';




@IonicPage()
@Component({
  selector: 'page-allusers',
  templateUrl: 'allusers.html',
})

export class AllusersPage {

  constructor(public navCtrl: NavController, public storage:Storage, public navParams: NavParams,private usersService:UsersProvider) {
    

    usersService.mostrar_todos_usuarios();
  }

  ionViewDidLoad() {
   
  }

  borrar_usuario(id)
  {
    this.usersService.borrar_usuario(id);
    this.navCtrl.push(UsuarioeliminadoPage);
  }

}
