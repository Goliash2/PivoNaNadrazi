import {Component, OnDestroy, OnInit} from '@angular/core';
import {NadrazkyService} from '../shared/nadrazky.service';
import {Subscription} from 'rxjs';
import {Nadrazka, NadrazkaNear} from '../shared/nadrazky.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-pub-home',
  templateUrl: './pub-home.page.html',
  styleUrls: ['./pub-home.page.scss'],
})
export class PubHomePage implements OnInit, OnDestroy {

  isLoading = false;
  openedSwitch = true;
  searchBoxValue: string;
  loadedNadrazky: NadrazkaNear[];
  filteredNadrazky: NadrazkaNear[];
  listedloadedNadrazky: NadrazkaNear[];
  private nadrazkySub: Subscription;
  maxdist = 15000;

  constructor(private nadrazkyService: NadrazkyService, private geolocation: Geolocation) { }

  ngOnInit() {
    this.nadrazkySub = this.nadrazkyService.nearNadrazky.subscribe(nadrazky => {
      this.loadedNadrazky = nadrazky;
      this.filteredNadrazky = this.loadedNadrazky.filter(
          nadrazka => nadrazka.status === 'Otevřena');
      this.listedloadedNadrazky = this.filteredNadrazky.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Current position: lat: ' + resp.coords.latitude + ', lng: ' + resp.coords.longitude);
      this.nadrazkyService.fetchNearNadrazky(resp.coords.latitude, resp.coords.longitude, this.maxdist).subscribe(() => {
        this.isLoading = false;
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  updateFilter(search: string, openedSwitch: boolean) {
    if (!search) {
      if (!openedSwitch) {
        this.filteredNadrazky = this.loadedNadrazky;
        this.listedloadedNadrazky = this.filteredNadrazky.slice(1);
      } else {
        this.filteredNadrazky = this.loadedNadrazky.filter(
            nadrazka => nadrazka.status === 'Otevřena');
        this.listedloadedNadrazky = this.filteredNadrazky.slice(1);
      }
    } else {
      if (!openedSwitch) {
        this.filteredNadrazky = this.loadedNadrazky.filter(
            nadrazka => nadrazka.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
        this.listedloadedNadrazky = this.filteredNadrazky.slice(1);
      } else {
        this.filteredNadrazky = this.loadedNadrazky.filter(
            nadrazka => (nadrazka.name.toLowerCase().indexOf(search.toLowerCase()) > -1) && (nadrazka.status === 'Otevřena'));
        this.listedloadedNadrazky = this.filteredNadrazky.slice(1);
      }
    }
  }

  changeSearch(event) {
    this.searchBoxValue = event.detail.value;
    this.updateFilter(this.searchBoxValue, this.openedSwitch);
  }

  changeOpened(event) {
    console.log(event.detail.value);
    this.openedSwitch = JSON.parse(event.detail.value);
    this.updateFilter(this.searchBoxValue, this.openedSwitch);
  }

  // onFilterUpdate() {
  //   if (event.detail.value === 'all') {
  //     this.filteredPlaces = this.loadedPlaces;
  //     this.listedLoadedPlaces = this.filteredPlaces.slice(1);
  //   } else {
  //     this.filteredPlaces = this.loadedPlaces.filter(place => place.userId !== this.authService.userId);
  //     this.listedLoadedPlaces = this.filteredPlaces.slice(1);
  //   }
  // }

  ngOnDestroy(): void {
    if (this.nadrazkySub) {
      this.nadrazkySub.unsubscribe();
    }
  }

}
