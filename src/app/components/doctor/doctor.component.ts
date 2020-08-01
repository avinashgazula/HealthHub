/* @author Avinash Gazula <agazula@dal.ca> */
/* @author Rudra Makwana <rd851601@dal.ca> */

import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';


@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.css'],
})

export class DoctorComponent implements OnInit {
    serverUrl: string = environment.serverUrl;
    searchForm: FormGroup;

    filterValues: string[] = ['Specialization', 'Name'];
    selected = 'Name';
    constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef, private snackBar: MatSnackBar, private router: Router, private http: HttpClient) {

    }

    resultsAll;
    resultPhysician;
    resultSurgeons;
    body;
    ngOnInit(): void {
        this.searchForm = this.fb.group({
            search: ['', [Validators.required]]
        });
        this.body = { type: "doctor" }
        this.changeDetectorRef.detectChanges();
        this.http.post<any>(this.serverUrl + '/search/alldoctors', this.body).subscribe(data => {
            this.resultsAll = data;
        });
        this.http.post<any>(this.serverUrl + '/search/all-physicians', this.body).subscribe(data => {
            this.resultPhysician = data;
        });
        this.http.post<any>(this.serverUrl + '/search/all-surgeons', this.body).subscribe(data => {
            this.resultSurgeons = data;
        });
    }

    ngOnDestroy() {

    }

    get search() {
        return this.searchForm.get('search');
    }

    name;
    id;
    click = (doctor) => {
        this.name = doctor.name;
        this.id = doctor._id;
        this.router.navigateByUrl('/doctor', { state: { doctorObject: doctor } });
    };

    onSearch(filterValue, keywordValue) {
        if (keywordValue.length != 0) {
            this.router.navigateByUrl('/searchresult', { state: { filter: filterValue, keyword: keywordValue } });
        } else {
            alert("Write in search box");
        }
    }

}
