import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
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
        this.snackBar.open(doctor.name, '', {
            duration: 3000,
        });
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
