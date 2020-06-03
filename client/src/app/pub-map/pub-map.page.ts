import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {latLng, Map, tileLayer, icon, divIcon, Marker, Popup, marker} from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Nadrazka} from '../shared/nadrazky.model';
import * as L from 'leaflet';

// const iconRetinaUrl = 'assets/marker-icon-2x.png';
// const iconUrl = 'assets/marker-icon.png';
// const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = divIcon({
  className: 'custom-div-icon',
  html: '<div style="width: 30px;\n' +
      '  height: 30px;\n' +
      '  border-radius: 50% 50% 50% 0;\n' +
      '  background: #222222;\n' +
      '  position: absolute;\n' +
      '  transform: rotate(-45deg);\n' +
      '  left: 50%;\n' +
      '  top: 50%;\n' +
      '  margin: -15px 0 0 -15px;"></div><ion-icon style="position: absolute;\n' +
      '  color: lawngreen;\n' +
      '  width: 22px;\n' +
      '  font-size: 22px;\n' +
      '  left: 0;\n' +
      '  right: 0;\n' +
      '  margin: 10px auto;\n' +
      '  text-align: center;" name="beer"></ion-icon>',
  iconSize: [30, 42],
  iconAnchor: [15, 42]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-pub-map',
  templateUrl: './pub-map.page.html',
  styleUrls: ['./pub-map.page.scss'],
})

export class PubMapPage implements AfterViewInit {
  public map: Map;
  options = {
    layers: [
      tileLayer('https://m1.mapserver.mapy.cz/turist-m/{z}-{x}-{y}', { maxZoom: 19, attribution: '&copy; <a href="http://www.seznam.cz">Seznam.cz, a.s.</a>, <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
    ],
    zoom: 12,
    center: latLng(50.44176389056172, 14.08721923828125)
  };
  layers = [];

  constructor(private http: HttpClient, private geolocation: Geolocation) { }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Current position: lat: ' + resp.coords.latitude + ', lng: ' + resp.coords.longitude);
      this.map.panTo([resp.coords.latitude, resp.coords.longitude]);
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    this.http.get('http://localhost:3000/nadrazky').subscribe((nadrazky: Nadrazka[]) => {
      console.log(nadrazky);
      nadrazky.forEach((nadrazka) => {
        const pubMarker = L.marker([nadrazka.location.lng, nadrazka.location.lat]).addTo(this.map);
        pubMarker.bindPopup('<h1>' + nadrazka.name + '</h1><p>dalsi info: ' + nadrazka.station + '</p>');
      });
      // nadrazky = geoJSON(json, {
      //   onEachFeature(feature, layer) {
      //     layer.bindPopup('<h1>' + feature.properties.name + '</h1><p>dalsi info: ' + feature.properties.name + '</p>');
      //   }
      // });
      // this.layers = [
      //   nadrazky
      // ];
    });
  }

  onNewLocation(e: Location) {
    console.log(e);
  }

}
