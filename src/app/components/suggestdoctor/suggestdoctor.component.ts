import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'healthhub-suggestdoctor',
  templateUrl: './suggestdoctor.component.html',
  styleUrls: ['./suggestdoctor.component.css']
})
export class SuggestdoctorComponent implements OnInit {

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

  foods: any[] = [
    {value: 'Ontario'},
    {value: 'Toronto'},
    {value: 'Halifax'}
  ];

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
      this.firstFormGroup = this.formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this.formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
    }

  viewDoctor(){

  }

}
