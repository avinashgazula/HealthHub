// author: Harshit Trivedi

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs/operators';
import { OrderMedicineService } from 'src/app/services/orderMedicine/orderMedicine.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from './../login/login.component';

// defining the syntax of pharmacy names
export interface StateGroup {
  letter: string;
  names: string[];
}

// pharmacy names to lower case to maintain consistency of names
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'healthhub-medicine-delivery',
  templateUrl: './medicine-delivery.component.html',
  styleUrls: ['./medicine-delivery.component.css'],
  providers: [OrderMedicineService]
})
export class MedicineDeliveryComponent implements OnInit {
  // stateForm: FormGroup = this._formBuilder.group({
  // pharmacyName: '',});
  pharmacyNames: StateGroup[]

  @ViewChild('fileInput') fileInput: ElementRef;
  public image;

  stateGroupOptions: Observable<StateGroup[]>;
  public formPersonalRecord: FormGroup;
  formErrors: any;

  constructor(private builder: FormBuilder,
    private snackBar: MatSnackBar,
    // private _formBuilder: FormBuilder,
    private orderMedicineService: OrderMedicineService,
    private router: Router,
    private dialog: MatDialog,) {

    // redirect to login page if user is not logged in
    if (!localStorage.getItem('token') || localStorage.getItem('token') === null ||
      localStorage.getItem('token') === undefined) {
      this.dialog.closeAll();
      this.dialog.open(LoginComponent, { disableClose: true });
    }

    // GET call to fetch all the pharmacy names from pharmacylists table
    this.orderMedicineService.getPharmacyList().subscribe(
      pharmacyNamesdata => {
        this.pharmacyNames = pharmacyNamesdata['data'];
      }
    )

    //constucting the form and its validations
    this.formPersonalRecord = this.builder.group({
      pharmacyName: ['', [Validators.required]],
      apartmentNo: ['', Validators.required],
      streetAddress: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(6),
      Validators.maxLength(6)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10),
      Validators.maxLength(10)]],
      prescriptionFile: ['', Validators.required],
      comments: [''],
      userId: localStorage.getItem('userId')
    });

    this.formErrors = {
      pharmacyName: {},
      apartmentNo: {},
      streetAddress: {},
      postalCode: {},
      mobileNumber: {},
      prescriptionFile: {}
    };
  }

  // checking forms validity and showing necessary error messages
  onFormValuesChanged() {
    for (const field in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(field)) {
        continue;
      }
      this.formErrors[field] = {};
      const control = this.formPersonalRecord.get(field);
      if (control && control.dirty && !control.valid) {
        this.formErrors[field] = control.errors;
      }
    }
  }

  ngOnInit(): void {
    // setting up pharmacy names in the form
    this.stateGroupOptions = this.formPersonalRecord.get('pharmacyName')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    // validating user input 
    this.formPersonalRecord.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }

  // iterating the pharmacy names and returning them
  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.pharmacyNames
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }
    return this.pharmacyNames;
  }

  // converting the prescription image to base64 format
  // logic referenced from https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
  onFileChange(event) {
    var files1 = event.target.files;
    var file1 = files1[0];
    if (files1 && file1) {
      var reader1 = new FileReader();
      reader1.onload = this._handleReaderLoaded.bind(this);
      reader1.readAsBinaryString(file1);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.formPersonalRecord.value["prescriptionFile"] = btoa(binaryString);
  }

  // submitting the form
  onSubmit(event) {
    event.preventDefault();
    var orderData = this.formPersonalRecord.value;
    // subsribing to the service in order to make post request
    this.orderMedicineService.postOrder(JSON.stringify(orderData)).subscribe(
      data => {
        if (data.success) {
          // everything went fine and data inserted in DB
          this.snackBar.open('Your order has been placed Succesfully !!', '', {
            duration: 3000,
          });
          // route back to HomePage
          this.router.navigate(['/']);
        } else {
          // unable to post, server error
          this.snackBar.open('Error: Prescription file should be less than 90kb. Please retry', '', {
            duration: 7000,
          });
          this.router.navigate(['/orderMedicine'])
        }
      }
    )


    this.snackBar.open('Your order has been placed Succesfully !!', '', {
      duration: 3000,
    });


  }
}