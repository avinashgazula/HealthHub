import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInsurance} from '../../model/IInsurance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private _http: HttpClient;
  constructor(private http:HttpClient) { }
   readJsondata() : Observable<any>
   {
     return this.http.get('./assets/insurancedata.json');
   }
}
