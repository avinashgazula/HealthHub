/* @author Avinash Gazula <agazula@dal.ca> */

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from './../../services/location/location.service';
import { Observable } from 'rxjs';
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/storage';
import { RegistrationService } from './../../services/registration/registration.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './../login/login.component';

@Component({
  selector: 'healthhub-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  detailsForm: FormGroup;
  downloadURL: Observable<string>;
  imageUrl: string = '';

  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
    private locationService: LocationService,
    private cd: ChangeDetectorRef,
    private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      image: [null, Validators.required],
      specialization: ['', [Validators.required]],
      location: ['', [Validators.required]],
      fee: [null, Validators.required],
      description: ['']
    });
  }

  getFeeError = () => {
    if (this.fee.hasError('required')) {
      return 'Consultation fee is required';
    }
    return 'Enter a valid fee in $';
  };

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        const longitude = position.coords.longitude.toString();
        const latitude = position.coords.latitude.toString();

        this.locationService.getAddress(latitude, longitude).subscribe(data => {
          let address = data.results[1].formatted_address;
          this.detailsForm.controls['location'].setValue(address);

        })
      });
    } else {
      console.log(`No support for geolocation`);
    }
  }

  onFileChange(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `HealthHub/${n}.tiff`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.imageUrl = url;
            }
          });
        })
      )
      .subscribe();
  }

  save = () => {
    let formData = this.detailsForm.value;
    formData.image = this.imageUrl;
    formData.email = this.dialogData.email;
    formData.type = this.dialogData.type;
    this.registrationService.registerDoctor(JSON.stringify(formData)).subscribe(
      data => {
        if (data.success) {
          this.openLoginPage();
          this.snackBar.open('Registration Succesful', '', {
            duration: 3000,
          });
        }
      }
    )

  }

  openLoginPage = () => {
    this.dialog.closeAll();
    this.dialog.open(LoginComponent);
  };

  public get image() {
    return this.detailsForm.get('image')
  }

  public get specialization() {
    return this.detailsForm.get('specialization')
  }

  public get location() {
    return this.detailsForm.get('location')
  }

  public get fee() {
    return this.detailsForm.get('fee')
  }

  public get description() {
    return this.detailsForm.get('description')
  }

}
