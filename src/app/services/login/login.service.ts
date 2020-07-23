import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serverUrl: string = environment.serverUrl;

  constructor(private httpClient: HttpClient) { }

  login(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.httpClient.post(this.serverUrl + '/users/login', body, httpOptions);
  }

  logout(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(token)
      })
    }

    return this.httpClient.get(this.serverUrl + '/users/logout', httpOptions);
  }
}
