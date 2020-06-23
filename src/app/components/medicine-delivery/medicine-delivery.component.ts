import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'healthhub-medicine-delivery',
  templateUrl: './medicine-delivery.component.html',
  styleUrls: ['./medicine-delivery.component.css']
})
export class MedicineDeliveryComponent implements OnInit {
  public formPersonalRecord: FormGroup;
  formErrors: any;
  constructor(private builder: FormBuilder) {

    this.formPersonalRecord = this.builder.group({
      aptNumber: ['', Validators.required],
      streetAddress: ['', Validators.required],
      postalCode: ['', [Validators.required,Validators.minLength(6), 
      Validators.maxLength(6)]],

      mobileNumber: ['',[Validators.required,Validators.minLength(10), 
        Validators.maxLength(10)]]
    });

    this.formErrors = {
      aptNumber: {},
      streetAddress: {},
      postalCode: {},
      mobileNumber: {}
    };
  }

  onFormValuesChanged()
  {    
    for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }
            this.formErrors[field] = {};
            const control = this.formPersonalRecord.get(field);
            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
  }

  ngOnInit(): void {
    this.formPersonalRecord.valueChanges.subscribe(() => {
      this.onFormValuesChanged();
    });
  }
  onSubmit() {
    alert("Your order is confirmed !! \nIt will be delivered within 2 business days.")
  }
}
