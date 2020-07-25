/* @author Sai Sunil Menta <ss734478@dal.ca> */

import { Component, OnInit } from '@angular/core';
import { SuggestDoctorModel } from 'src/app/model/suggestDoctorModel';
import { SuggestDoctorService } from 'src/app/services/suggestdoctor/suggestdoctor.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'healthhub-suggestdoctor',
    templateUrl: './suggestdoctor.component.html',
    styleUrls: ['./suggestdoctor.component.css']
})

export class SuggestdoctorComponent implements OnInit {

    suggestQuery: SuggestDoctorModel = new SuggestDoctorModel();

    symptoms: string[];
    selectedSymptoms;
    doctorList: any[];

    cities: any[] = [
        { value: 'Ontario' },
        { value: 'Toronto' },
        { value: 'Halifax' },
        { value: 'Montreal' },
        { value: 'Vancouver' }
    ];

    constructor(private suggestDoctorService: SuggestDoctorService, private dialog: MatDialog) {
        if (!localStorage.getItem('token') || localStorage.getItem('token') === null ||
            localStorage.getItem('token') === undefined) {
            this.dialog.closeAll();
            this.dialog.open(LoginComponent, { disableClose: true });
        }
    }

    ngOnInit() {

        this.suggestDoctorService.getSymtomList().subscribe((data) => {
            this.symptoms = data;
        });

        this.selectedSymptoms = new Set();
    }

    viewDoctor() {

    }

    priceRange(value: number) {
        return value;
    }

    suggestDoctor() {

        this.suggestDoctorService.getSuggestedDoctor(this.suggestQuery).subscribe((doctorlist) => {

            this.doctorList = doctorlist;
            console.log(this.doctorList);
            this.doctorList.forEach((data) => {
                console.log('Name' + data.image);
            });
        }
        );
    }

    checkAndUncheckSymptoms(event: any, value: string) {

        if (event.checked) {
            if (!this.suggestQuery.symptoms.has(value)) {
                this.suggestQuery.symptoms.add(value);
            }
        } else {

            if (this.suggestQuery.symptoms.has(value)) {
                this.suggestQuery.symptoms.delete(value);
            }
        }

    }

}
