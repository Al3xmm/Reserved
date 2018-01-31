import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RestaurantsProvider {

  restaurantes:any;

  constructor(public http: HttpClient) {
    //descomentar la siguiente linea si queremos que solo carge los restaurantes una vez
    this.mostrar_todos();
  }

  mostrar_todos(){

    let url="api/allrestaurants";
    
    this.http.get(url)
      .subscribe(data=>{
        //guardamos en la variable restaurantes el data que nos devuelve la petición a la API
        this.restaurantes=data;
    });

  }

}
