/* @author Avinash Gazula <agazula@dal.ca> */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl: string = environment.serverUrl;

  constructor(private httpClient: HttpClient) { }

  verifyToken(): Observable<any> {
    let token = localStorage.getItem('token')
    let params = { token }
    return this.httpClient.get(this.serverUrl + '/users/verify', { params })
  }

  isDoctor(): boolean {
    let userType = localStorage.getItem('userType')
    if (userType && userType === "doctor") {
      return true
    }
    return false
  }
}
