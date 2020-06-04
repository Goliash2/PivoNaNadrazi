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
  loadedNadrazky: Nadrazka[];
  filteredNadrazky: Nadrazka[];
  listedloadedNadrazky: Nadrazka[];
  private nadrazkySub: Subscription;

  constructor(private nadrazkyService: NadrazkyService) { }

  ngOnInit() {
    this.nadrazkySub = this.nadrazkyService.nadrazky.subscribe(nadrazky => {
      this.loadedNadrazky = nadrazky;
      this.filteredNadrazky = this.loadedNadrazky;
      this.listedloadedNadrazky = this.loadedNadrazky.slice(1);
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.nadrazkyService.fetchNadrazky().subscribe(() => {
      this.isLoading = false;
    });
  }

  updateFilter(event) {
    if (!event.detail.value) {
      this.filteredNadrazky = this.loadedNadrazky;
      this.listedloadedNadrazky = this.filteredNadrazky.slice(1);
    } else {
      this.filteredNadrazky = this.loadedNadrazky.filter(
          nadrazka => nadrazka.name.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      this.listedloadedNadrazky = this.filteredNadrazky.slice(1);
    }
    console.log(event.detail.value);
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
