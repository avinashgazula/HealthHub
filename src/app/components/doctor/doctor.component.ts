import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        type: 'General Physician',
        values: DATA
    },
    {
        type: 'Pediatricians',
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

    filterValues: string[] = ['Specialization', 'Name'];

    constructor(private changeDetectorRef: ChangeDetectorRef, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.changeDetectorRef.detectChanges();
        this.obs = this.dataSource.connect();
    }

    ngOnDestroy() {
        if (this.dataSource) {
            this.dataSource.disconnect();
        }
    }

    click = (name) => {
        this.snackBar.open(name, '', {
            duration: 3000,
        });
    };
}
