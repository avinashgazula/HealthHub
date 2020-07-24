import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  serverUrl: string = environment.serverUrl;

  constructor(private httpClient: HttpClient) { }

  sendVerificationToken(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.post(this.serverUrl + '/users/send-token', body, httpOptions);
  }

  updatePassword(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.post(this.serverUrl + '/users/update-password', body, httpOptions);
  }

}
