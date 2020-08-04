import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'healthhub-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  userID;

  serverUrl = environment.serverUrl;
  
  currentUserID;
  currentUserType;
  currentUserName;
  booleanUserType; //True: doctor False: consumer
  body;
  result;
  personalInfo;
  BMI = 0;

  constructor(private builder: FormBuilder,
    private dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router) {
    if (!localStorage.getItem('token') || localStorage.getItem('token') === null ||
      localStorage.getItem('token') === undefined) {
      this.dialog.closeAll();
      this.dialog.open(LoginComponent, { disableClose: true });
    } else {

      this.userID = localStorage.getItem('patientID');
        
      this.currentUserID = localStorage.getItem('userId');
      this.currentUserType = localStorage.getItem('userType');
      this.currentUserName = localStorage.getItem('name');
      if (this.currentUserType === "doctors" || this.currentUserType === "Doctors" || this.currentUserType === "doctor" || this.currentUserType === "Doctor") {
        this.booleanUserType = true;
        if(this.userID == null || this.userID == undefined || this.userID == ""){
            alert("Unknown error occured || Patient cannot be found");
            router.navigate(['view-doctor-appointments']);
        }
      } else {
        this.booleanUserType = false;
      }
      if (this.result == null || this.result == undefined) {
        this.result = {
          Height: 0,
          Weight: 0,
          bloodPressure: 0,
          heartRate: 0,
          hemoglobin: 0,
          hemoglobinA1c: 0,
          hematocrit: 0,
          rbc: 0,
          wbc: 0,
          plt: 0
        }
      }
    }
  }

  ngOnInit(): void {
    this.currentUserName;
    this.currentUserType;
    this.currentUserID;

    if (this.booleanUserType) {
      this.body = { uID: this.userID };
      this.http.post<any>(this.serverUrl + '/medical/details', this.body).subscribe(results => {
        if (results == undefined || results == null) {
          this.result = this.result;

          if (this.result.Height == 0) {
            this.BMI = 0;
          }
          else {
            this.BMI = (this.result.Weight / (Math.pow(this.result.Height, 2))) * 10000;
          }

        }
        else {
          this.result = results;
        }
      });
      this.http.post<any>(this.serverUrl + '/medical/userinfo', this.body).subscribe(results => {
        this.personalInfo = results;
      });
    }
    else {
      this.body = { uID: this.currentUserID };
      this.http.post<any>(this.serverUrl + '/medical/details', this.body).subscribe(results => {
        if (results == undefined || results == null) {
          this.result = this.result;
          if (this.result.Height == 0) {
            this.BMI = 0;
          }
          else {
            this.BMI = (this.result.Weight / (Math.pow(this.result.Height, 2))) * 10000;
          }
        }
        else {
          this.result = results;
        }
      });
      this.http.post<any>(this.serverUrl + '/medical/userinfo', this.body).subscribe(results => {
        this.personalInfo = results;
      });
    }
  }

  check;
  onSubmit = (uID, result) => {
    this.body = {
      userId: uID,
      Height: result.Height,
      Weight: result.Weight,
      bloodPressure: result.bloodPressure,
      heartRate: result.heartRate,
      hemoglobin: result.hemoglobin,
      hemoglobinA1c: result.hemoglobinA1c,
      hematocrit: result.hematocrit,
      rbc: result.rbc,
      wbc: result.wbc,
      plt: result.plt
    }
    this.http.post<any>(this.serverUrl + '/medical/update', this.body).subscribe(results => {
      this.check = results;
      if (this.check.success) {
        this.snackBar.open("Medical History is updated successfully", '', {
          duration: 3000
        });
      }
      else {
        this.snackBar.open("Medical History is not updated Successfully", '', {
          duration: 3000
        });
      }
    });


  }

  heightChange = (value) => {
    this.result.Height = value;

    if (this.result.Height == 0) {
      this.BMI = 0;
    } else {
      this.BMI = (this.result.Weight / (Math.pow(this.result.Height, 2))) * 10000;
    }
  }

  weightChange = (value) => {
    this.result.Weight = value;
    if (this.result.Height == 0) {
      this.BMI = 0;
    }
    else {
      this.BMI = (this.result.Weight / (Math.pow(this.result.Height, 2))) * 10000;
    }
  }

  bpChange = (value) => {
    this.result.bloodPressure = value;
  }

  hrChange = (value) => {
    this.result.heartRate = value;
  }

  hemoChange = (value) => {
    this.result.hemoglobin = value;
  }

  hemoaChange = (value) => {
    this.result.hemoglobinA1c = value;
  }

  hemaChange = (value) => {
    this.result.hematocrit = value;
  }

  rbcChange = (value) => {
    this.result.rbc = value;
  }

  wbcChange = (value) => {
    this.result.wbc = value;
  }

  pltChange = (value) => {
    this.result.plt = value;
  }
}
