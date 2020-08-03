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
        
        return this.httpClient.get<any[]>(this.serverUrl + '/appointment/getAppointments/5f19e5d03ab922452c38632c');
    }

    acceptAppointment(id) {

        return this.httpClient.post(this.serverUrl + '/appointment/acceptAppointment/' + id, '');
    }

    declineAppointment(id) {

        return this.httpClient.post(this.serverUrl + '/appointment/deleteAppointment/' + id, '');
    }

    getUserById(id){
        return this.httpClient.get(this.serverUrl+'/users/getUser/'+'5f25c424a2d11f453c1893f0');
    }
}
