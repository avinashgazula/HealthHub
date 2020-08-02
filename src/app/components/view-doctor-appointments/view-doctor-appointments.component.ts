/* @author Sai Sunil Menta <ss734478@dal.ca> */

import { Component, OnInit } from '@angular/core';
import { DoctorAppointmentsService } from 'src/app/services/appointment/doctorappointments.service';

@Component({
    selector: 'healthhub-view-doctor-appointments',
    templateUrl: './view-doctor-appointments.component.html',
    styleUrls: ['./view-doctor-appointments.component.css']
})
export class ViewDoctorAppointmentsComponent implements OnInit {

    appointmentList: any[];

    constructor(private doctorAppointmentsService: DoctorAppointmentsService) { }

    ngOnInit(): void {

        this.doctorAppointmentsService.getAllAppointments().subscribe((data) => {
            this.appointmentList = data;
        });
    }

    acceptAppointment(id){

    }

    deleteAppoinment(id){

    }

}
