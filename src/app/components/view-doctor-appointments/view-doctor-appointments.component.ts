/* @author Sai Sunil Menta <ss734478@dal.ca> */

import { Component, OnInit } from '@angular/core';
import { DoctorAppointmentsService } from 'src/app/services/appointment/doctorappointments.service';
import { database } from 'firebase';

@Component({
    selector: 'healthhub-view-doctor-appointments',
    templateUrl: './view-doctor-appointments.component.html',
    styleUrls: ['./view-doctor-appointments.component.css']
})
export class ViewDoctorAppointmentsComponent implements OnInit {

    appointmentList: any[];
    userDetails: any;


    constructor(private doctorAppointmentsService: DoctorAppointmentsService) { }

    ngOnInit(): void {

        this.loadAppointments();
    }

    acceptAppointment(id){
        this.appointmentList=null
        this.doctorAppointmentsService.acceptAppointment(id).subscribe((data)=>{
            this.loadAppointments();
        });   
    }

    deleteAppoinment(id){
        this.appointmentList=null
        this.doctorAppointmentsService.declineAppointment(id).subscribe((data)=>{
            this.loadAppointments();
        });
    }

    loadAppointments(){
        this.doctorAppointmentsService.getAllAppointments().subscribe((data) => {
            this.appointmentList = data;
        });
        
    }

}
