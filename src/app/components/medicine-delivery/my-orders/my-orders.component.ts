// author: Harshit Trivedi

import { Component, OnInit } from '@angular/core';
import { OrderMedicineService } from 'src/app/services/orderMedicine/orderMedicine.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// defining the syntax of order
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
    // extracting the user ID to fetch orders for the same user
    const id = localStorage.getItem('userId');

    // subscribing to the service in order to GET the user's orders
    this.orderMedicineService.getMyOrders(id).subscribe(
      userOrderData => {
        // extracting only the orders data from the API
        this.orderData = userOrderData['data'];
        this.orderLength = userOrderData['count'];

        // notifying user if they have 0 orders
        if (this.orderLength === 0) {
          this.isDataPresent = false;
          this.snackBar.open('Your do not have any pending orders !!', '', {
            duration: 4000,
          });
        }
      }
    )
  }

  ngOnInit(): void {}

  // deleting an order by orderID
  deleteOrder(id) {
    this.orderMedicineService.deleteOrder(id).subscribe(
      userOrderData => {
        // iterate through all the orders and delete only the selected order
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