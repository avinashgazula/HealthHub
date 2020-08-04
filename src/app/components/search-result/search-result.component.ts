/* @author Rudra Makwana <rd851601@dal.ca> */


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'healthhub-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  serverUrl: string = environment.serverUrl;

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.router.getCurrentNavigation().extras.state;
  }

  keyword;
  filter;
  body;
  result;
  resultSize;

  ngOnInit(): void {
    this.keyword = history.state.keyword;
    this.filter = history.state.filter;

    if (this.keyword == null) {
      this.router.navigate(['/consult']);
    }
    else {
      this.body = { keyword: this.keyword, searchfield: this.filter };
      this.http.post<any>(this.serverUrl + '/search/search-doctors', this.body).subscribe(results => {
        this.result = results;
      })
      if(this.result == null || this.result == undefined) {
        this.resultSize = 0;
      }
      else{
        this.resultSize = this.result.length();
      }
    }
  }

  name;
  id;
  onClick(doctor) {
    this.snackBar.open(doctor.name, '', {
      duration: 3000,
    });
    this.name = doctor.name;
    this.id = doctor._id;
    this.router.navigateByUrl('/doctor', { state: { doctorObject: doctor } });
  }

}
