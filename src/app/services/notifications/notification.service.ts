import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

/* @author Sai Sunil Menta <ss734478@dal.ca> */

@Injectable()
export class NotificationService {

    serverUrl: string = environment.serverUrl;

    constructor(private httpClient: HttpClient) { }

    getNotifications(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.serverUrl + '/getNotifications/' + localStorage.getItem('userId'));
    }

    markAsRead(id) {
        return this.httpClient.post(this.serverUrl + '/readNotification/' + id, '');
    }

}
