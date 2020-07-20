import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs/operators';
import { OrderMedicineService } from 'src/app/services/orderMedicine/orderMedicine.service';

export interface StateGroup {
  letter: string;
  names: string[];
}

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
  pharmacyName: string;
  apartmentNo: number;
  streetAddress: string;
  postalCode: string;
  mobileNumber: number;
  prescription: string;

  stateForm: FormGroup = this._formBuilder.group({
    pharmacyName: '',
  });
  // the below pharmacy store data has been referenced from the URL: https://pans.ns.ca/public/you-your-pharmacist/pharmacy-finder
  pharmacyNames: StateGroup[]

  stateGroupOptions: Observable<StateGroup[]>;
  public formPersonalRecord: FormGroup;
  formErrors: any;

  constructor(private builder: FormBuilder, 
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private orderMedicineService: OrderMedicineService) {

      this.orderMedicineService.getPharmacyList().subscribe(
        pharmacyNamesdata => {
          console.log(pharmacyNamesdata);
          this.pharmacyNames = pharmacyNamesdata['data'];
        }
      )

      this.formPersonalRecord = this.builder.group({
      pharmacyName: ['', [Validators.required]],
      apartmentNo: ['', Validators.required],
      streetAddress: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(6),
      Validators.maxLength(6)]],

      mobileNumber: ['', [Validators.required, Validators.minLength(10),
      Validators.maxLength(10)]]
    });

    this.formErrors = {
      pharmacyName: {},
      apartmentNo: {},
      streetAddress: {},
      postalCode: {},
      mobileNumber: {}
    };
  }

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
    this.stateGroupOptions = this.formPersonalRecord.get('pharmacyName')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    this.formPersonalRecord.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }
  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.pharmacyNames
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.pharmacyNames;
  }

  onClear() {

  }

  onSubmit(event) {
    event.preventDefault();
    var orderData = this.formPersonalRecord.value;
    console.log(orderData);
    this.orderMedicineService.postOrder(JSON.stringify(orderData)).subscribe(
      data => {

      }
    )

    this.snackBar.open('Your order has been placed Succesfully !!', '', {
      duration: 3000,
    });
  }
}