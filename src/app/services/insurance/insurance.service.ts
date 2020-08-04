/* @author Vidip Malhotra <vidip.malhotra@dal.ca> */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { userInsurance } from '../../model/userinsurance';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  serverUrl: string = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getAllInsurance() {
    return this.http.get(this.serverUrl + '/insurance/');
  }

  getspecificInsurance(user_id) {
    return this.http.get(this.serverUrl + '/insurance/specific/' + user_id);
  }

  submituserdetails(user_id,dataobject: userInsurance) {
    return this.http.post(this.serverUrl + '/userinsurance/userdetails/'+user_id, dataobject).toPromise().then(data => {
    });
  }

  getuserdetails(user_id){
    return this.http.get(this.serverUrl + '/userinsurance/userdetails/'+user_id);
  }

  readJsondata(): Observable<any> {
    return this.http.get('./assets/insurancedata.json');
  }

  sendemail(email,message){
    return this.http.get(this.serverUrl + '/insurance/email/' + email + "/"+ message);
  }
}
