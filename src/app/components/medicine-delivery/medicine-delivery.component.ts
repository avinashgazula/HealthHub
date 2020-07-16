import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

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
  styleUrls: ['./medicine-delivery.component.css']
})
export class MedicineDeliveryComponent implements OnInit {
  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });
  // the below pharmacy store data has been referenced from the URL: https://pans.ns.ca/public/you-your-pharmacist/pharmacy-finder
  stateGroups: StateGroup[] = [{
    letter: 'A',
    names: ['ACS Pharmacy - Dartmouth']
  }, {
    letter: 'B',
    names: ['Bayshore Pharmacy - Bayers Road', 'Bedford Pharmacy - Bedford']
  }, {
    letter: 'C',
    names: ['City of Lakes Pharmacy - Dartmouth', 'Cobequid Pharmacy - Lower Sackville', 'Costco Pharmacy - Chain Lake Drive']
  }, {
    letter: 'D',
    names: ['Drugstore Pharmacy - Dartmouth', 'Family Drug Centre - Dartmouth']
  }, {
    letter: 'G',
    names: ['Guardian Pharmacy - Dartmouth', 'Guardian Scotia Pharmacy - Gottingen Street']
  }, {
    letter: 'I',
    names: ['Innomar Pharmacy - Dartmouth']
  }, {
    letter: 'L',
    names: ['Lacewood Pharmacy - Lacewood Drive', 'Lawtons Drug Store - Bayers Road', 'Lawtons Drug Store - Lacewood Drive', 'Lawtons Drug Store - Spring Garden Road', 'Lawtons Drug Store - Duke St.', 'Lawtons Drug Store - North St.', 'Lawtons Drug Store - Mumford Road', 'Loblaw Pharmacy - Bayers Road', 'Loblaw Pharmacy - Lacewood Drive', 'Loblaw Pharmacy - Spring Garden Road', 'Loblaw Pharmacy - Duke St.', 'Loblaw Pharmacy - North St.', 'Loblaw Pharmacy - Mumford Road']
  }, {
    letter: 'M',
    names: ['Monaghan Pharmacy - Young St.']
  }, {
    letter: 'N',
    names: ['Nova Pharmacy - Coburg Road']
  }, {
    letter: 'R',
    names: ['Rockingham Pharmacy - Farnham Gate Rd']
  }, {
    letter: 'S',
    names: ['Shipp Pharmacy - Young St.', 'Shoppers Drug Mart - Almon St.', 'Shoppers Drug Mart - Bedford Highway', 'Shoppers Drug Mart - Dartmouth', 'Shoppers Drug Mart - Fenwick St.', 'Shoppers Drug Mart - Herring Cove Rd.', 'Shoppers Drug Mart - Lacewood Drive', 'Shoppers Drug Mart - Quinpool Road.', 'Shoppers Drug Mart - Spring Garden Road', 'Sobeys Pharmacy - Barrington Passage', 'Sobeys Pharmacy - Bedford Highway', 'Sobeys Pharmacy - Dartmouth', 'Sobeys Pharmacy - Herring Cove Rd.', 'Sobeys Pharmacy - Lacewood Drive', 'Sobeys Pharmacy - Mumford Road.']
  }, {
    letter: 'T',
    names: ['The Medicine Shoppe - Lacewood Drive', 'The Medicine Shoppe - Quinpool Road']
  }, {
    letter: 'W',
    names: ['Walmart Pharmacy - Chain Lake Drive', 'Walmart Pharmacy - Dartmouth', 'Walmart Pharmacy - Mumford Road']
  }];

  stateGroupOptions: Observable<StateGroup[]>;
  public formPersonalRecord: FormGroup;
  formErrors: any;
  constructor(private builder: FormBuilder, private _formBuilder: FormBuilder) {

    this.formPersonalRecord = this.builder.group({
      stateGroup: ['', [Validators.required]],
      aptNumber: ['', Validators.required],
      streetAddress: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.minLength(6),
      Validators.maxLength(6)]],

      mobileNumber: ['', [Validators.required, Validators.minLength(10),
      Validators.maxLength(10)]]
    });

    this.formErrors = {
      stateGroup: {},
      aptNumber: {},
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
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
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
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }
  onSubmit() {
    alert("Your order is confirmed !! \nIt will be delivered within 2 business days.")
  }
}
