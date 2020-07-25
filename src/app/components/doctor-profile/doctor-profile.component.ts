import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']

})
export class DoctorProfileComponent implements OnInit {
  obs: Observable<any>;
  review = new FormControl('', [Validators.required]);

  time1: Boolean = false;
  time2: Boolean = false;
  time3: Boolean = false;
  time4: Boolean = false;

  constructor(private snackBar: MatSnackBar, private changeDetectorRef: ChangeDetectorRef, private router: Router) {
    this.router.getCurrentNavigation().extras.state;
  }

  getReviewErrorMessage = () => {
    if (this.review.hasError('required')) {
      return 'You must enter a value';
    }
  };

  doctorName;
  doctorID;
  doctorSpecialization;
  doctorDescription;
  doctorLocation;
  doctorFee;
  doctorImageSrc;
  doctor;
  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.doctor = history.state.doctorObject;

    if (this.doctor == null) {
      this.router.navigate(['/consult']);
    } else {
      this.doctorID = this.doctor._id;
      this.doctorName = this.doctor.name;
      this.doctorSpecialization = this.doctor.specialization;
      this.doctorDescription = this.doctor.description;
      this.doctorLocation = this.doctor.location;
      this.doctorFee = this.doctor.fee;
      this.doctorImageSrc = this.doctor.image_url;
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
