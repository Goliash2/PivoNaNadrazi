import {Component, OnDestroy, OnInit} from '@angular/core';
import {NadrazkyService} from '../shared/nadrazky.service';
import {Subscription} from 'rxjs';
import {Nadrazka} from '../shared/nadrazky.model';

@Component({
  selector: 'app-pub-list',
  templateUrl: './pub-list.page.html',
  styleUrls: ['./pub-list.page.scss'],
})
export class PubListPage implements OnInit, OnDestroy {

  isLoading = false;
  openedSwitch = true;
  searchBoxValue: string;
  loadedNadrazky: Nadrazka[];
  filteredNadrazky: Nadrazka[];
  listedloadedNadrazky: Nadrazka[];
  private nadrazkySub: Subscription;

  constructor(private nadrazkyService: NadrazkyService) { }

  ngOnInit() {
    this.nadrazkySub = this.nadrazkyService.nadrazky.subscribe(nadrazky => {
      this.loadedNadrazky = nadrazky;
      this.filteredNadrazky = this.loadedNadrazky.filter(
          nadrazka => nadrazka.status === 'Otevřena');
      this.listedloadedNadrazky = this.filteredNadrazky.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.nadrazkyService.fetchNadrazky().subscribe(() => {
      this.isLoading = false;
    });
  }

  updateFilter(search: string, openedSwitch: boolean) {
    if (!search) {
      if (!openedSwitch) {
        this.filteredNadrazky = this.loadedNadrazky;
      } else {
        this.filteredNadrazky = this.loadedNadrazky.filter(
            nadrazka => nadrazka.status === 'Otevřena');
      }
    } else {
      if (!openedSwitch) {
        this.filteredNadrazky = this.loadedNadrazky.filter(
            nadrazka => nadrazka.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
      } else {
        this.filteredNadrazky = this.loadedNadrazky.filter(
            nadrazka => (nadrazka.name.toLowerCase().indexOf(search.toLowerCase()) > -1) && (nadrazka.status === 'Otevřena'));
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
