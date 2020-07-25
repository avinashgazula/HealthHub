import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

export interface Card {
    title: string;
    subtitle: string;
    image: string;
}

export interface Doctor {
    type: string;
    values: Card[];
}

const DATA: Card[] = [
    {
        title: 'Dr. Shea Reeves',
        subtitle: '⭐⭐⭐⭐⭐',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    },
    {
        title: 'Dr. Rishi Henson',
        subtitle: '⭐⭐⭐⭐',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    {
        title: 'Dr. Codie Sullivan',
        subtitle: '⭐⭐⭐',
        image: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    {
        title: 'Dr. Anastasia Tierney',
        subtitle: '⭐⭐⭐⭐⭐',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    },
    {
        title: 'Dr. Viktor Hills',
        subtitle: '⭐⭐⭐⭐⭐',
        image: 'https://images.unsplash.com/photo-1587716351184-4a2a1c161efd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    },
    {
        title: 'Dr. Amelia-Grace Hendricks',
        subtitle: '⭐⭐⭐⭐⭐',
        image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1035&q=80'
    },
    {
        title: 'Dr. Rishi Henson',
        subtitle: '⭐⭐⭐⭐',
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    {
        title: 'Dr. Codie Sullivan',
        subtitle: '⭐⭐⭐',
        image: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    {
        title: 'Dr. Anastasia Tierney',
        subtitle: '⭐⭐⭐⭐⭐',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    }
];

const data: Doctor[] = [
    {
        type: 'All Doctors',
        values: DATA
    },
    {
        type: 'General Physician',
        values: DATA
    },
    {
        type: 'Cardiologists',
        values: DATA
    }
]

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.css'],
})

export class DoctorComponent implements OnInit {
    obs: Observable<any>;
    dataSource: MatTableDataSource<Doctor> = new MatTableDataSource<Doctor>(data);
    searchForm: FormGroup;

    filterValues: string[] = ['Specialization', 'Name'];
    selected = 'Name';
    constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef, private snackBar: MatSnackBar, private router: Router, private http: HttpClient) {

     }

    resultsAll;
    resultPhysician;
    resultSurgeons;
    body;
    ngOnInit() :void {
        this.searchForm = this.fb.group({
            search: ['', [Validators.required]]
        });
        this.body = {type: "doctor"}
        this.changeDetectorRef.detectChanges();
        this.obs = this.dataSource.connect();
        this.http.post<any>('http://localhost:8080/search/alldoctors', this.body).subscribe(data => {
            this.resultsAll = data;
        });
        this.http.post<any>('http://localhost:8080/search/all-physicians', this.body).subscribe(data => {
            this.resultPhysician = data;
        });
        this.http.post<any>('http://localhost:8080/search/all-surgeons', this.body).subscribe(data => {
            this.resultSurgeons = data;
        });
    }
    
    ngOnDestroy() {
        if (this.dataSource) {
            this.dataSource.disconnect();
        }
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
        this.router.navigateByUrl('/doctor', {state: {doctorObject: doctor}});
    };

    onSearch(filterValue, keywordValue){
        if(keywordValue.length!=0){
            this.router.navigateByUrl('/searchresult', {state: {filter: filterValue, keyword: keywordValue}});
        } else{
            alert("Write in search box");
        }
    }

}
