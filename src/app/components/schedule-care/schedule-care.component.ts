import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker'

@Component({
  selector: 'healthhub-schedule-care',
  templateUrl: './schedule-care.component.html',
  styleUrls: ['./schedule-care.component.css']
})
export class ScheduleCareComponent implements OnInit {
  scheduleCare: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.scheduleCare = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      careDate: ['', [Validators.required]]
    })
  }

  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }

  get name() {
    return this.scheduleCare.get('name');
  }

  getNameError = () => {
    if (this.name.hasError('required')) {
      return 'Name is required';
    }
  }

  get address() {
    return this.scheduleCare.get('address');
  }

  getAddressError = () => {
    if (this.address.hasError('required')) {
      return 'Address is required';
    }
  }

  get careDate() {
    return this.scheduleCare.get('careDate');
  }

  getDateError = () => {
    if (this.name.hasError('required')) {
      return 'Select a date to book Home Care';
    }
  }

  onScheduleAssessment() {
    alert('Your appointment is confirmed !!' )
  }

}
