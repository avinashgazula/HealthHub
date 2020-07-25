/* @author Vidip Malhotra <vidip.malhotra@dal.ca> */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private http: HttpClient) { }
  readJsondata(): Observable<any> {
    return this.http.get('./assets/insurancedata.json');
  }
}
