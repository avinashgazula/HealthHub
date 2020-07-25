/* @author Sai Sunil Menta <ss734478@dal.ca> */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuggestDoctorModel } from 'src/app/model/suggestDoctorModel';
import { environment } from './../../../environments/environment';

@Injectable()
export class SuggestDoctorService {
    serverUrl: string = environment.serverUrl;

    constructor(private httpClient: HttpClient) { }

    getSymtomList(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.serverUrl + '/getSymptomsList');
    }

    getSuggestedDoctor(suggestQuery: SuggestDoctorModel): Observable<any[]> {

        const body = {
            "location": suggestQuery.location,
            "price": suggestQuery.price,
            "symptoms": Array.from(suggestQuery.symptoms)
        };
        return this.httpClient.post<any[]>(this.serverUrl + '/suggestDoctor', body);
    }
}
