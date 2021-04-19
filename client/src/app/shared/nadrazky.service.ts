import { Injectable } from '@angular/core';
import {Nadrazka, NadrazkaNear} from './nadrazky.model';
// import {AuthService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';


// interface PlaceData {
//     dateFrom: string;
//     dateTo: string;
//     description: string;
//     imageUrl: string;
//     price: number;
//     title: string;
//     userId: string;
// }

@Injectable({
    providedIn: 'root'
})
export class NadrazkyService {
    private innerNadrazky = new BehaviorSubject<Nadrazka[]>([]) ;
    private innerNearNadrazky = new BehaviorSubject<NadrazkaNear[]>([]) ;
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
    };

    get nadrazky() {
        return this.innerNadrazky.asObservable();
    }
    get nearNadrazky() {
        return this.innerNearNadrazky.asObservable();
    }

    constructor( /* private authService: AuthService, */ private http: HttpClient) {}

    fetchNadrazky() {
        return this.http.get<Nadrazka[]>('https://app.nadrazky.fd.cvut.cz/api/nadrazky').pipe(tap(nadrazky => {
        // return this.http.get<Nadrazka[]>('http://localhost:3000/nadrazky').pipe(tap(nadrazky => {
            this.innerNadrazky.next(nadrazky);
        }));
    }

    fetchNearNadrazky(lat: number, lng: number, maxdist: number) {
        const data = {
            lat,
            lng,
            maxdist
        };
        return this.http.post<NadrazkaNear[]>('https://app.nadrazky.fd.cvut.cz/api/nadrazky-near', data, this.httpOptions)
            .pipe(tap(nadrazky => {
        // return this.http.post<NadrazkaNear[]>('http://localhost:3000/nadrazky-near', data, this.httpOptions).pipe(tap(nadrazky => {
            this.innerNearNadrazky.next(nadrazky);
        }));
    }

    // getPlace(id: string) {
    //     return this.httpClient
    //         .get<PlaceData>(`https://bookings-test-190d2.firebaseio.com/offered-places/${id}.json`)
    //         .pipe(
    //             map(placeData => {
    //                 return new Place(
    //                     id,
    //                     placeData.title,
    //                     placeData.description,
    //                     placeData.imageUrl,
    //                     placeData.price,
    //                     new Date(placeData.dateFrom),
    //                     new Date(placeData.dateTo),
    //                     placeData.userId
    //                 );
    //             })
    //         );
    // }
    //
    // addPlace(
    //     title: string,
    //     description: string,
    //     imageUrl: string,
    //     price: number,
    //     dateFrom: Date,
    //     dateTo: Date
    // ) {
    //     let generatedId: string;
    //     const newPlace = new Place(
    //         Math.random().toString(),
    //         title,
    //         description,
    //         imageUrl,
    //         price,
    //         dateFrom,
    //         dateTo,
    //         this.authService.userId
    //     );
    //     return this.httpClient
    //         .post<{name: string}>('https://bookings-test-190d2.firebaseio.com/offered-places.json', { ...newPlace, id: null})
    //         .pipe(
    //             switchMap(resData => {
    //                 generatedId = resData.name;
    //                 return this.places;
    //             }),
    //             take(1),
    //             tap(places => {
    //                 newPlace.id = generatedId;
    //                 this.innerPlaces.next(places.concat(newPlace));
    //             })
    //         );
    //     // return this.places.pipe(take(1), delay(1000), tap(places => { // Faking loading with delay...
    //     //     this.innerPlaces.next(places.concat(newPlace));
    //     // }));
    // }
    //
    // updatePlace(
    //     placeId: string,
    //     title: string,
    //     description: string,
    //     imageUrl: string,
    //     price: number,
    //     dateFrom: Date,
    //     dateTo: Date
    // ) {
    //     let updatedPlaces: Place[];
    //     return this.places.pipe(
    //         take(1),
    //         switchMap(places => {
    //             const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
    //             updatedPlaces = [...places];
    //             const oldPlace = updatedPlaces[updatedPlaceIndex];
    //             updatedPlaces[updatedPlaceIndex] = new Place(
    //                 oldPlace.id,
    //                 title,
    //                 description,
    //                 imageUrl,
    //                 +price,
    //                 new Date(dateFrom),
    //                 new Date(dateTo),
    //                 oldPlace.userId
    //             );
    //             return this.httpClient.put(
    //                 `https://bookings-test-190d2.firebaseio.com/offered-places/${placeId}.json`,
    //                 {...updatedPlaces[updatedPlaceIndex], id: null}
    //             );
    //         }),
    //         tap(() => {
    //             this.innerPlaces.next(updatedPlaces);
    //         })
    //     );
    // }

    // editPlace(
    //     id: string,
    //     title: string,
    //     description: string,
    //     imageUrl: string,
    //     price: number,
    //     dateFrom: Date,
    //     dateTo: Date
    // ) {
    //   const editedPlace = new Place(
    //       id,
    //       title,
    //       description,
    //       imageUrl,
    //       price,
    //       dateFrom,
    //       dateTo,
    //       this.authService.userId
    //   );
    //   return this.places.pipe(filter(p => p.target.id === editedPlace.id), delay(1000), tap(places => { // Faking loading with delay...
    //     this.innerPlaces.next(places.concat(newPlace));
    //   }));
    // }
}
