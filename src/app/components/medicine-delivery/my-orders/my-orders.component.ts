import { Component, OnInit } from '@angular/core';
import { OrderMedicineService } from 'src/app/services/orderMedicine/orderMedicine.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface OrderGroup {
  _id: number;
  date: [];
  pharmacyName: string;
  apartmentNo: number;
  streetAddress: string;
  postalCode: string;
  mobileNumber: number;
}

@Component({
  selector: 'healthhub-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  providers: [OrderMedicineService]
})
export class MyOrdersComponent implements OnInit {
  orderData: OrderGroup[];
  orderDate: [];

  constructor(private orderMedicineService: OrderMedicineService,
    private snackBar: MatSnackBar,) { 
    this.orderMedicineService.getMyOrders().subscribe(
      userOrderData => {
        console.log(userOrderData);        
        this.orderData = userOrderData['data'];
        console.log(this.orderData);
      }
    )
  }

  ngOnInit(): void {}

  deleteOrder(id) {
    this.orderMedicineService.deleteOrder(id).subscribe(
      userOrderData => {
        for(var i =0; i< this.orderData.length; i++){
          if(this.orderData[i]._id == id){
            this.orderData.splice(i, 1);
          }
        }
      }
    )
    this.snackBar.open('Your order has been cancelled !!', '', {
      duration: 4000,
    });
  }

}
