import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { strict } from 'assert';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  getAddress(latitude: string, longitude: string): Observable<any> {
    let key: string = environment.googleMapsApiKey;
    let url: string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true&key=' + key;
    console.log(url);

    return this.httpClient.get(url);
  }
}
