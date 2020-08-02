/* @author Sai Sunil Menta <ss734478@dal.ca> */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable()
export class DoctorAppointmentsService {

    serverUrl: string = environment.serverUrl;

    constructor(private httpClient: HttpClient) {

    }

    getAllAppointments(): Observable<any[]> {
        return this.httpClient.get<any[]>(this.serverUrl + '/appointment/getAppointments/' + localStorage.getItem('userId'));
    }

    acceptAppointment(id) {

        return this.httpClient.post(this.serverUrl + '/appointment/acceptAppointment/' + id, '');
    }

    declineAppointment(id) {

        return this.httpClient.post(this.serverUrl + '/appointment/deleteAppointment/' + id, '');
    }
}
