/* @author Avinash Gazula <agazula@dal.ca> */
/* @author Rudra Makwana <rd851601@dal.ca> */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppointmentService } from './../../services/appointment/appointment.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']

})
export class DoctorProfileComponent implements OnInit {
  obs: Observable<any>;
  todayDate = new Date();
  appointmentForm: FormGroup
  timeSlots: Array<Boolean> = Array(4).fill(false);
  allowedTimeSlots: Array<String> = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
  reservedSlotsIndex: Array<Boolean> = Array(4).fill(false)
  userId: string = localStorage.getItem('userId')
  userName: string = localStorage.getItem('name')

  constructor(
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-CA')
    this.router.getCurrentNavigation().extras.state;
    this.todayDate.setDate(this.todayDate.getDate())

    this.appointmentForm = this.fb.group({
      date: [null, [Validators.required]],
    })
  }

  doctor: any;
  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.doctor = history.state.doctorObject;

    if (this.doctor == null) {
      this.router.navigate(['/consult']);
    } else {
      this.getDoctorAppointmentSlots();
    }
  }

  getDoctorAppointmentSlots = () => {
    if (this.date.value != null) {
      let date = new Date(this.date.value).toLocaleDateString('en-CA');
      let params = {
        doctorId: this.doctor._id,
        date: date
      }
      this.appointmentService.getReservedSlots(params).subscribe(data => {
        if (data.success) {
          this.reservedSlotsIndex = Array(4).fill(false)
          for (let i = 0; i < this.allowedTimeSlots.length; i++) {
            if (data.reservedSlots.includes(this.allowedTimeSlots[i])) {
              this.reservedSlotsIndex[i] = true
            }
          }
        }
      })
    }

  }

  get date() {
    return this.appointmentForm.get('date')
  }

  selectTime1 = () => {
    this.timeSlots = Array(4).fill(false);
    this.timeSlots[0] = true;
  }
  selectTime2 = () => {
    this.timeSlots = Array(4).fill(false);
    this.timeSlots[1] = true;
  }
  selectTime3 = () => {
    this.timeSlots = Array(4).fill(false);
    this.timeSlots[2] = true;
  }
  selectTime4 = () => {
    this.timeSlots = Array(4).fill(false);
    this.timeSlots[3] = true;
  }

  onDateChange = () => {
    this.getDoctorAppointmentSlots();
  }

  confirmAppointment = () => {
    let timeIndex: number = this.timeSlots.indexOf(true);
    if (timeIndex === -1) {
      this.snackBar.open('Please select a time for the appointment', '', {
        duration: 3000,
      });
    } else {
      let date = new Date(this.date.value).toLocaleDateString('en-CA');
      let formData = {
        'date': date,
        'doctorId': this.doctor._id,
        'patientId': this.userId,
        'patientName': this.userName,
        'time': this.allowedTimeSlots[timeIndex]
      }
      console.log(formData);

      this.appointmentService.requestAppointment(formData).subscribe(data => {
        if (data.success) {
          this.getDoctorAppointmentSlots()
          this.snackBar.open('Appointment Reserved! You will receive a notification if the Doctor accepts your appoinment', '', {
            duration: 3000,
          });
        }
      })
    }

  };

}
