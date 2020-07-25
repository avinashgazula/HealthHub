// author: Harshit Trivedi

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable()
export class HomeCareService {
  serverUrl: string = environment.serverUrl;
  constructor(private httpClient: HttpClient) { }

  // method to add new homeCare data to the database 
  postHomeCare(newCare: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    // using the POST method with the resource URL, data in body and options as parameters
    return this.httpClient.post(this.serverUrl + '/homeCare', newCare, httpOptions);
  }
}