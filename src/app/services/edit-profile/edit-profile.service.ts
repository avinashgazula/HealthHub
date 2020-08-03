import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  serverUrl: string = environment.serverUrl;

  constructor(private httpClient: HttpClient) { }

  editProfile(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.post(this.serverUrl + '/users/edit', body, httpOptions);
  }
}
