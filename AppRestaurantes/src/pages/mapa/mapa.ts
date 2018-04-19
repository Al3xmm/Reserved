import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  map: any;

  submit:boolean=false;

  address:any;

  markers:any[];

  markercreado:boolean=false;

  lat:any;
  long:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation:Geolocation, private viewCtrl:ViewController, public restaurantService:RestaurantProvider) {
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 38.3459963, lng: -0.4906855000000405}
    });

    map.addListener('click', function(event) {
      (document.getElementById("lat") as HTMLInputElement).value = event.latLng.lat();
      (document.getElementById("lng") as HTMLInputElement).value = event.latLng.lng();
      if(this.markercreado==true){
          this.markers.setMap(null);
      }

      var marker = new google.maps.Marker({
        map: map,
        position: event.latLng
      });

      this.markercreado=true;
      this.markers=marker;
    });
    this.map=map;
  }

  geocodeAddress(geocoder, resultsMap) {
    geocoder.geocode({'address': this.address}, function(results, status) {
      if (status === 'OK') {
        if(this.markercreado==true){
          this.markers.setMap(null);
        }
        (document.getElementById("lat") as HTMLInputElement).value = results[0].geometry.location.lat();
        (document.getElementById("lng") as HTMLInputElement).value = results[0].geometry.location.lng();
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        this.markercreado=true;
        this.markers=marker;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  add_marker(){
    var geocoder = new google.maps.Geocoder();
    this.geocodeAddress(geocoder, this.map);
  }

  close() {
    this.viewCtrl.dismiss();
    this.restaurantService.latlng=(document.getElementById("lat") as HTMLInputElement).value+"_"+(document.getElementById("lng") as HTMLInputElement).value;
    console.log(this.restaurantService.latlng);
  }

}
