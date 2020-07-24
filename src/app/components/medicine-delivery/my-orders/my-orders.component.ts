import { Component, OnInit } from '@angular/core';
import { OrderMedicineService } from 'src/app/services/orderMedicine/orderMedicine.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface OrderGroup {
  _id: number;
  date: [];
  pharmacyName: string;
  apartmentNo: number;
  streetAddress: string;
  postalCode: string;
  mobileNumber: number;
  userId: string;
}

@Component({
  selector: 'healthhub-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  providers: [OrderMedicineService]
})
export class MyOrdersComponent implements OnInit {
  orderData: Array<OrderGroup>;
  orderLength: number;
  orderUserId: string;
  isDataPresent: boolean;
  orderDate: [];

  constructor(private orderMedicineService: OrderMedicineService,
    private router: Router,
    private snackBar: MatSnackBar,) {
    const id = localStorage.getItem('userId');
    console.log("Id is: " + id);

    this.orderMedicineService.getMyOrders(id).subscribe(
      userOrderData => {
        console.log(userOrderData);
        this.orderData = userOrderData['data'];
        this.orderLength = userOrderData['count'];
        console.log(this.orderData);

        if (this.orderLength === 0) {
          this.isDataPresent = false;
          this.snackBar.open('Your do not have any pending orders !!', '', {
            duration: 4000,
          });
        }
        console.log("Orderdata length is: " + this.orderLength);
      }
    )
  }

  ngOnInit(): void {}

  deleteOrder(id) {
    this.orderMedicineService.deleteOrder(id).subscribe(
      userOrderData => {
        for (var i = 0; i < this.orderData.length; i++) {
          if (this.orderData[i]._id == id) {
            this.orderData.splice(i, 1);
          }
        }
      }
    )
    this.snackBar.open('Your order has been cancelled !!', '', {
      duration: 4000,
    });
    this.router.navigate(['/'])
  }

  goToOrderMedicine(){
    this.router.navigate(['/orderMedicine'])
  }
}