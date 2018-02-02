import { RestaurantPage } from './../pages/restaurant/restaurant';

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
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PerfilPage,
    RegistroPage,
    AllrestaurantsPage,
    RestaurantPage
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
    RestaurantPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    RestaurantsProvider
  ]
})
export class AppModule {}
