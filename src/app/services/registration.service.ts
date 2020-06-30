import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  register(body: any) {
    return this.httpClient.post('http;//localhost:8080/users/register', body, {
      observe: body,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

}
