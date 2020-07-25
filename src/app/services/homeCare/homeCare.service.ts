// author: Harshit Trivedi

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HomeCareService {
    constructor(private httpClient: HttpClient){}

    // method to add new homeCare data to the database 
    postHomeCare(newCare: any): Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }

    // using the POST method with the resource URL, data in body and options as parameters
    return this.httpClient.post('/homeCare', newCare, httpOptions);
    }
}