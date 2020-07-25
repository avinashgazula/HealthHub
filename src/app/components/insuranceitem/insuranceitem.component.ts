/* @author Vidip Malhotra <vidip.malhotra@dal.ca> */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-insuranceitem',
  templateUrl: './insuranceitem.component.html',
  styleUrls: ['./insuranceitem.component.css']
})
export class InsuranceitemComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  insuranceData: any = [];
  filteredinsuranceData: any = [];
  username: any = '';
  age: any = '';
  salary: any = '';
  gender: any = '';
  email: any = '';
  recommendation: any = '';
  insdata: any = [];

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.email = this.route.snapshot.paramMap.get('email');
    this.age = this.route.snapshot.paramMap.get('age');
    this.gender = this.route.snapshot.paramMap.get('gender');
    this.salary = parseInt(this.route.snapshot.paramMap.get('salary'));
    this.http.get('./assets/insurancedata.json').toPromise().then(data => {
      this.insdata = data;
      this.loaddata(this.insdata);
    });
    this.recommendation = 'HealthPlan 1 will suit more on the basis of your profile, as evaluated by system on basis of past health problems and your salary range. It would cover most of the health issues including COVID.'
  }

  filterData(username, email, age, gender, salary) {
    this.filteredinsuranceData = this.insuranceData.filter(option => option.agegroup == age);
  }

  loaddata(ins) {
    this.insuranceData = ins;
    this.filterData(this.username, this.email, this.age, this.gender, this.salary);
  }
}
