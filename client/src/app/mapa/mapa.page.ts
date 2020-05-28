import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {geoJSON, latLng, Map, tileLayer, icon, divIcon, Marker, Popup, marker} from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
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
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})

export class MapaPage implements AfterViewInit {
  public map: Map;
  options = {
    layers: [
      tileLayer('https://m1.mapserver.mapy.cz/turist-m/{z}-{x}-{y}', { maxZoom: 19, attribution: '&copy; <a href="http://www.seznam.cz">Seznam.cz, a.s.</a>, <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
    ],
    zoom: 10,
    center: latLng(50.44176389056172, 14.08721923828125)
  };
  layers = [];

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
  }

  onMapReady(map: Map) {
    this.map = map;
    this.http.get('assets/nadrazky.geojson').subscribe((json: any) => {
      console.log(json);
      const nadrazky = geoJSON(json, {
        onEachFeature(feature, layer) {
          layer.bindPopup('<h1>' + feature.properties.name + '</h1><p>dalsi info: ' + feature.properties.name + '</p>');
        }
      });
      this.layers = [
        nadrazky
      ];
    });
  }

  onNewLocation(e: Location) {
    console.log(e);
  }

}
