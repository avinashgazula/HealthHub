import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderMedicineService {
    constructor(private httpClient: HttpClient){

    }

    getPharmacyList(){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
  
      return this.httpClient.get('/orderMedicine/getPharmacyList', httpOptions);
    }

    postOrder(newOrder){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }

    return this.httpClient.post('/orderMedicine', newOrder, httpOptions);
    }

    getMyOrders(){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.httpClient.get('/orderMedicine/getOrders', httpOptions)
    }

    deleteOrder(id){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
      return this.httpClient.delete('/orderMedicine/'+id, httpOptions);
    }
}