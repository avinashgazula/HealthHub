/* @author Avinash Gazula <agazula@dal.ca> */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) { }

  getAddress(latitude: string, longitude: string): Observable<any> {
    const key: string = environment.googleMapsApiKey;
    const url: string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true&key=' + key;
    console.log(url);

    return this.httpClient.get(url);
  }
}
