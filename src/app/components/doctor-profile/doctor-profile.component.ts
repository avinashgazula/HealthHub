import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface Review {
  user: string;
  rating: number;
  review: string;
}

const DATA: Review[] = [
  {
    user: 'Harrison O\'Ryan',
    rating: 5,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed sollicitudin purus'
  },
  {
    user: 'Bruce Wayne',
    rating: 4,
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed sollicitudin purus. Pellentesque ac nisl ut massa tempus faucibus. Suspendisse mi enim, tincidunt eget iaculis ac, fermentum vel quam.'
  }
]

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
  obs: Observable<any>;
  dataSource: MatTableDataSource<Review> = new MatTableDataSource<Review>(DATA);

  time1: Boolean = false;
  time2: Boolean = false;
  time3: Boolean = false;
  time4: Boolean = false;

  constructor(private snackBar: MatSnackBar, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();
    this.obs = this.dataSource.connect();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  selectTime1 = () => {
    console.log("test");

    this.time1 = true;
    this.time2 = false;
    this.time3 = false;
    this.time4 = false;
  }
  selectTime2 = () => {
    console.log("test");
    this.time1 = false;
    this.time2 = true;
    this.time3 = false;
    this.time4 = false;
  }
  selectTime3 = () => {
    console.log("test");
    this.time1 = false;
    this.time2 = false;
    this.time3 = true;
    this.time4 = false;
  }
  selectTime4 = () => {
    console.log("test");
    this.time1 = false;
    this.time2 = false;
    this.time3 = false;
    this.time4 = true;
  }

  confirmAppointment = () => {
    this.snackBar.open('Appointment Confirmed', '', {
      duration: 3000,
    });
  };

}
