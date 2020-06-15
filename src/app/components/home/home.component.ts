import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Appointment {
  doctor: string;
  type: string;
  date: string;
  time: string;
  image: string;
}

export interface Order {
  medicine: string;
  image: string;
  price: string;
  date: string;
}

const DATA: Appointment[] = [
  {
    doctor: 'Dr. Shea Reeves',
    type: 'Physician',
    date: '2020-06-15',
    time: '09:00 AM',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    doctor: 'Dr. Rishi Henson',
    type: 'Pediatrician',
    date: '2020-06-18',
    time: '02:00PM',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },

];

const orders: Order[] = [
  {
    medicine: 'Zoloft',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    price: '$24.99',
    date: '2020-06-22'
  },
  {
    medicine: 'Prozac',
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=677&q=80',
    price: '$12.99',
    date: '2020-06-25'
  },
  {
    medicine: 'Vortioxetine',
    image: 'https://images.unsplash.com/photo-1544991936-9464fa9919d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    price: '$12.99',
    date: '2020-06-21'
  }
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filterValues: string[] = ['Appointments', 'Orders'];
  obs: Observable<any>;
  obsOrders: Observable<any>;
  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource<Appointment>(DATA);
  dataSourceOrders: MatTableDataSource<Order> = new MatTableDataSource<Order>(orders);
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]]
    })
    this.changeDetectorRef.detectChanges();
    this.obs = this.dataSource.connect();
    this.obsOrders = this.dataSourceOrders.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    if (this.dataSourceOrders) {
      this.dataSourceOrders.disconnect();
    }
  }


  get search() {
    return this.searchForm.get('search');
  }

}
