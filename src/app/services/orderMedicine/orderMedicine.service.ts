/* @author Harshit Trivedi <harshit.trivedi@dal.ca> */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable()
export class OrderMedicineService {
  serverUrl: string = environment.serverUrl;

  constructor(private httpClient: HttpClient) { }

  // method to GET the pharmacy names from DB 
  getPharmacyList() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    // using the GET method with the resource URL and options as parameters
    return this.httpClient.get(this.serverUrl + '/orderMedicine/getPharmacyList', httpOptions);
  }

  // method to add new medicince order to the database 
  postOrder(newOrder: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    // using the POST method with the resource URL, data in body and options as parameters
    return this.httpClient.post(this.serverUrl + '/orderMedicine', newOrder, httpOptions);
  }

  // method to GET the orders for the current user from DB 
  getMyOrders(userId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    // using the GET method with the resource URL and options as parameters
    return this.httpClient.get(this.serverUrl + '/orderMedicine/' + userId, httpOptions)
  }

  // method to delete the order from the database 
  deleteOrder(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    // using the DELETE method with the resource URL and options as parameters
    return this.httpClient.delete(this.serverUrl + '/orderMedicine/' + id, httpOptions);
  }
}