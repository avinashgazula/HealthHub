// author: Harshit Trivedi

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeCareService } from 'src/app/services/homeCare/homeCare.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'healthhub-schedule-care',
  templateUrl: './schedule-care.component.html',
  styleUrls: ['./schedule-care.component.css'],
  providers: [HomeCareService]
})
export class ScheduleCareComponent implements OnInit {
  public scheduleCare: FormGroup;

  constructor(private fb: FormBuilder,
    private homeCareService: HomeCareService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) { }

  ngOnInit(): void {

    //constucting the form and validations
    this.scheduleCare = this.fb.group({
      userName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      homeCareDate: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10),
        Validators.maxLength(10)]],
      comments: ['']
    })
  }

  // datepicker syntax referenced from: https://material.angular.io/components/datepicker/examples
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();
    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }

  // using getters to access to the form control
  get userName() {
    return this.scheduleCare.get('userName');
  }

  // determing when to show error messages
  getNameError = () => {
    if (this.userName.hasError('required')) {
      return 'Please enter your Name';
    }
  }

  get address() {
    return this.scheduleCare.get('address');
  }

  getAddressError = () => {
    if (this.address.hasError('required')) {
      return 'Please enter your address';
    }
  }

  get homeCareDate() {
    return this.scheduleCare.get('homeCareDate');
  }

  getDateError = () => {
    if (this.homeCareDate.hasError('required')) {
      return 'Please select a date to book Home Care';
    }
  }

  get mobileNumber(){
    return this.scheduleCare.get('mobileNumber')
  }

  getMobileNumberError = () => {
    if (this.mobileNumber.hasError('required')) {
      return 'Please enter your contact number';
    }
    if (this.mobileNumber.hasError('minLength')) {
      return 'Contact number should be of 10 digits';
    }
  }

  // submitting the form
  onScheduleAssessment() {
    var homeCareData = this.scheduleCare.value;
    // subsribing to the service in order to make post request
    this.homeCareService.postHomeCare(JSON.stringify(homeCareData)).subscribe(
      data => {
        if (data.success) {
          // everything went fine
          this.snackBar.open('Home care booked succesfully !!', '', {
            duration: 3000,
          });
          this.dialog.closeAll();
          this.router.navigate(['/homeCare']);
        } else {
          // unable to post, server error
          this.snackBar.open('Server error occured, please try again !!', '', {
            duration: 3000,
          });
          this.dialog.closeAll();
          this.router.navigate(['/homeCare']);
        }
      })
  }
}
