import {Component, AfterViewInit, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {latLng, Map, tileLayer, icon, divIcon, Marker, Popup, marker} from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Nadrazka} from '../shared/nadrazky.model';
import * as L from 'leaflet';
import {Subscription} from 'rxjs';
import {NadrazkyService} from '../shared/nadrazky.service';

// const iconRetinaUrl = 'assets/marker-icon-2x.png';
// const iconUrl = 'assets/marker-icon.png';
// const shadowUrl = 'assets/marker-shadow.png';
const openPubIcon = divIcon({
  className: 'open-pub-icon',
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
const closedPubIcon = divIcon({
  className: 'closed-pub-icon',
  html: '<div style="width: 30px;\n' +
      '  height: 30px;\n' +
      '  border-radius: 50% 50% 50% 0;\n' +
      '  background: #222222;\n' +
      '  position: absolute;\n' +
      '  transform: rotate(-45deg);\n' +
      '  left: 50%;\n' +
      '  top: 50%;\n' +
      '  margin: -15px 0 0 -15px;"></div><ion-icon style="position: absolute;\n' +
      '  color: darkorange;\n' +
      '  width: 22px;\n' +
      '  font-size: 22px;\n' +
      '  left: 0;\n' +
      '  right: 0;\n' +
      '  margin: 10px auto;\n' +
      '  text-align: center;" name="beer"></ion-icon>',
  iconSize: [30, 42],
  iconAnchor: [15, 42]
});
const removedPubIcon = divIcon({
  className: 'removed-pub-icon',
  html: '<div style="width: 30px;\n' +
      '  height: 30px;\n' +
      '  border-radius: 50% 50% 50% 0;\n' +
      '  background: #222222;\n' +
      '  position: absolute;\n' +
      '  transform: rotate(-45deg);\n' +
      '  left: 50%;\n' +
      '  top: 50%;\n' +
      '  margin: -15px 0 0 -15px;"></div><ion-icon style="position: absolute;\n' +
      '  color: orangered;\n' +
      '  width: 22px;\n' +
      '  font-size: 22px;\n' +
      '  left: 0;\n' +
      '  right: 0;\n' +
      '  margin: 10px auto;\n' +
      '  text-align: center;" name="beer"></ion-icon>',
  iconSize: [30, 42],
  iconAnchor: [15, 42]
});
const otherPubIcon = divIcon({
  className: 'other-pub-icon',
  html: '<div style="width: 30px;\n' +
      '  height: 30px;\n' +
      '  border-radius: 50% 50% 50% 0;\n' +
      '  background: #222222;\n' +
      '  position: absolute;\n' +
      '  transform: rotate(-45deg);\n' +
      '  left: 50%;\n' +
      '  top: 50%;\n' +
      '  margin: -15px 0 0 -15px;"></div><ion-icon style="position: absolute;\n' +
      '  color: darkgrey;\n' +
      '  width: 22px;\n' +
      '  font-size: 22px;\n' +
      '  left: 0;\n' +
      '  right: 0;\n' +
      '  margin: 10px auto;\n' +
      '  text-align: center;" name="beer"></ion-icon>',
  iconSize: [30, 42],
  iconAnchor: [15, 42]
});

@Component({
  selector: 'app-pub-map',
  templateUrl: './pub-map.page.html',
  styleUrls: ['./pub-map.page.scss'],
})

export class PubMapPage implements AfterViewInit, OnInit {
  public map: Map;
  options = {
    layers: [
      tileLayer('https://m1.mapserver.mapy.cz/turist-m/{z}-{x}-{y}', { maxZoom: 19, attribution: '&copy; <a href="http://www.seznam.cz">Seznam.cz, a.s.</a>, <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
    ],
    zoom: 12,
    center: latLng(50.44176389056172, 14.08721923828125)
  };
  openedPubs = L.layerGroup([]);
  closedPubs = L.layerGroup([]);
  removedPubs = L.layerGroup([]);
  otherPubs = L.layerGroup([]);
  layers = [this.openedPubs, this.closedPubs, this.removedPubs, this.otherPubs];
  isLoading = false;
  loadedNadrazky: Nadrazka[];
  overlayMaps = {
    Otevřené: this.openedPubs,
    Zavřené: this.closedPubs,
    Zrušené: this.removedPubs,
    Ostatní: this.otherPubs,
  };
  private nadrazkySub: Subscription;

  constructor(private geolocation: Geolocation, private nadrazkyService: NadrazkyService) { }

  ngOnInit() {
    this.nadrazkySub = this.nadrazkyService.nadrazky.subscribe(nadrazky => {
      this.loadedNadrazky = nadrazky;
    });
  }

  ngAfterViewInit(): void {
  }

  onMapReady(map: Map) {
    this.map = map;
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
    this.nadrazkyService.fetchNadrazky().subscribe(() => {
      this.loadedNadrazky.forEach((nadrazka) => {
        const lastCommentNumber = nadrazka.comments.length;
        const lastCommentShortened =
            (nadrazka.comments[lastCommentNumber - 1].text.length < 300)
                ? nadrazka.comments[lastCommentNumber - 1].text
                : (nadrazka.comments[lastCommentNumber - 1].text.substr(0, 300) + '...');
        if (nadrazka.status === 'Otevřena') {
          L.marker([nadrazka.location.lng, nadrazka.location.lat], {icon: openPubIcon})
              .bindPopup('<h1>' + nadrazka.name + '</h1><p>stanice: ' + nadrazka.station + '</p><p>stav: ' + nadrazka.status + '</p><p>poslední komentář: ' + nadrazka.comments[0].inserted + ': ' + lastCommentShortened + '</p>', {className: 'custom-popup'}).addTo(this.openedPubs);
        } else if (nadrazka.status === 'Zavřena') {
          L.marker([nadrazka.location.lng, nadrazka.location.lat], {icon: closedPubIcon})
              .bindPopup('<h1>' + nadrazka.name + '</h1><p>stanice: ' + nadrazka.station + '</p><p>stav: ' + nadrazka.status + '</p><p>poslední komentář: ' + nadrazka.comments[0].inserted + ': ' + lastCommentShortened + '</p>', {className: 'custom-popup'}).addTo(this.closedPubs);
        } else if (nadrazka.status === 'Zrušena' || nadrazka.status === 'zrušena') {
          L.marker([nadrazka.location.lng, nadrazka.location.lat], {icon: removedPubIcon})
              .bindPopup('<h1>' + nadrazka.name + '</h1><p>stanice: ' + nadrazka.station + '</p><p>stav: ' + nadrazka.status + '</p><p>poslední komentář: ' + nadrazka.comments[0].inserted + ': ' + lastCommentShortened + '</p>', {className: 'custom-popup'}).addTo(this.removedPubs);
        } else {
          L.marker([nadrazka.location.lng, nadrazka.location.lat], {icon: otherPubIcon})
              .bindPopup('<h1>' + nadrazka.name + '</h1><p>stanice: ' + nadrazka.station + '</p><p>stav: ' + nadrazka.status + '</p><p>poslední komentář: ' + nadrazka.comments[0].inserted + ': ' + lastCommentShortened + '</p>', {className: 'custom-popup'}).addTo(this.otherPubs);
        }
      });
      L.control.layers(null, this.overlayMaps).addTo(map);
    });

    // nadrazky = geoJSON(json, {
    //   onEachFeature(feature, layer) {
    //     layer.bindPopup('<h1>' + feature.properties.name + '</h1><p>dalsi info: ' + feature.properties.name + '</p>');
    //   }
    // });
    // this.layers = [
    //   nadrazky
    // ];
  }

  onNewLocation(e: Location) {
    console.log(e);
  }

}
