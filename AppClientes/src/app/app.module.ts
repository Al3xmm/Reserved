import { ReservarPage } from './../pages/reservar/reservar';
import { CartaPage } from './../pages/carta/carta';
import { BusquedaPage } from './../pages/busqueda/busqueda';
import { MipedidoPage } from './../pages/mipedido/mipedido';
import { PedirPage } from './../pages/pedir/pedir';
import { ProductospedidoPage } from './../pages/productospedido/productospedido';
import { RestaurantPage } from './../pages/restaurant/restaurant';
import { ComentariosPage } from './../pages/comentarios/comentarios';
import { AllrestaurantsPage } from './../pages/allrestaurants/allrestaurants';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { UsersProvider } from '../providers/users/users';
import { RestaurantsProvider } from '../providers/restaurants/restaurants';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { RegistroPage } from '../pages/registro/registro';
import { ModificarperfilPage } from '../pages/modificarperfil/modificarperfil';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { MisReservasPage } from '../pages/mis-reservas/mis-reservas';
import { PedidoProvider } from '../providers/pedido/pedido';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PerfilPage,
    RegistroPage,
    AllrestaurantsPage,
    RestaurantPage,
    CartaPage,
    ReservarPage,
    MisReservasPage,
    ProductospedidoPage,
    PedirPage,
    MipedidoPage,
    BusquedaPage,
    ModificarperfilPage,
    ComentariosPage
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
    LoginPage,
    PerfilPage,
    RegistroPage,
    AllrestaurantsPage,
    RestaurantPage,
    CartaPage,
    ReservarPage,
    MisReservasPage,
    ProductospedidoPage,
    PedirPage,
    MipedidoPage,
    BusquedaPage,
    ModificarperfilPage,
    ComentariosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    RestaurantsProvider,
    PedidoProvider
  ]
})
export class AppModule {}
