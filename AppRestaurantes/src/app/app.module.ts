import { CrearpedidoPage } from './../pages/crearpedido/crearpedido';
import { MostrarreservasPage } from './../pages/mostrarreservas/mostrarreservas';
import { ReservasPage } from './../pages/reservas/reservas';
import { ModificarproductoPage } from './../pages/modificarproducto/modificarproducto';
import { AgregarproductoPage } from './../pages/agregarproducto/agregarproducto';
import { CartarestaurantePage } from './../pages/cartarestaurante/cartarestaurante';
import { AgregarempleadoPage } from './../pages/agregarempleado/agregarempleado';
import { ListaempleadosPage } from './../pages/listaempleados/listaempleados';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RestaurantePage } from '../pages/restaurante/restaurante';
import { RegistroPage } from '../pages/registro/registro';
import { RestaurantProvider } from '../providers/restaurant/restaurant';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { LoginempleadosPage } from '../pages/loginempleados/loginempleados';
import { ComentariosPage } from '../pages/comentarios/comentarios';
import { LoginrestaurantePage } from '../pages/loginrestaurante/loginrestaurante';
import { EmpleadoPage } from '../pages/empleado/empleado';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RestaurantePage,
    RegistroPage,
    ListaempleadosPage,
    AgregarempleadoPage,
    CartarestaurantePage,
    AgregarproductoPage,
    ModificarproductoPage,
    LoginempleadosPage,
    ComentariosPage,
    ReservasPage,
    MostrarreservasPage,
    LoginrestaurantePage,
    EmpleadoPage,
    CrearpedidoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RestaurantePage,
    RegistroPage,
    ListaempleadosPage,
    AgregarempleadoPage,
    CartarestaurantePage,
    AgregarproductoPage,
    ModificarproductoPage,
    LoginempleadosPage,
    ComentariosPage,
    ReservasPage,
    MostrarreservasPage,
    LoginrestaurantePage,
    EmpleadoPage,
    CrearpedidoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestaurantProvider
  ]
})
export class AppModule {}
