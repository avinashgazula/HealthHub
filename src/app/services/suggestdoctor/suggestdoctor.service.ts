import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuggestDoctorModel } from 'src/app/model/suggestDoctorModel';

@Injectable()
export class SuggestDoctorService {

    url = 'http://localhost:8080/getSymptomsList';
    suggestUrl = 'http://localhost:8080/suggestDoctor';

    constructor(private httpClient: HttpClient) {

    }

    getSymtomList(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.url);
    }

    getSuggestedDoctor(suggestQuery: SuggestDoctorModel): Observable<any[]> {

        const body = {
            "location": suggestQuery.location,
            "price": suggestQuery.price,
            "symptoms": Array.from(suggestQuery.symptoms)
        };
        return this.httpClient.post<any[]>(this.suggestUrl, body);
    }
}
