
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  serverUrl: string = environment.serverUrl;
  constructor(private httpClient: HttpClient) { }

  getReservedSlots(params: any): Observable<any> {
    return this.httpClient.get(this.serverUrl + '/appointment/reserved-slots', { params });
  }

  requestAppointment(body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.post(this.serverUrl + '/appointment/request', body, httpOptions);
  }

}
