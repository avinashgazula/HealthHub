import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OrderMedicineService {
    constructor(private httpClient: HttpClient){

    }
    postOrder(newOrder){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }

    return this.httpClient.post('/orderMedicine', newOrder, httpOptions);
    }
}