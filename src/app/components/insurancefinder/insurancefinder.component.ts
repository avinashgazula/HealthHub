import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InsuranceService } from '../../services/insurance/insurance.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-insurancefinder',
  templateUrl: './insurancefinder.component.html',
  styleUrls: ['./insurancefinder.component.css']
})
export class InsurancefinderComponent implements OnInit {

  constructor(private ins:InsuranceService,private http:HttpClient) {
   
   }
  checkparam:boolean;
  checker = false;
  submitted=true;
  fName:any='';
  uemail:any='';
  uphone:any='';
  company:any='';
  iname:any = '';
  uage:any='';
  ugender:any='';
  usalary:any='';
  age:any='';
  premiums:any='';
  insuranceData:any=[];
  insdata:any =[];
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  insuranceDatafilter:any=[  ];
  log(x){
  }
  checkEmail(email){
  }

  dataChanged(newObj,key)
  {
    this.loaddata(this.insdata);
    this.insuranceData = this.insuranceData.filter(option => option.insurancecompany == this.company || option.insurancename == this.iname || option.agegroup == this.age || option.premium == this.premiums);
  }
  onSubmit(form:NgForm)
  {
    this.checker=true;
    this.submitted=false;
  }

  ngOnInit(): void {
    this.http.get('./assets/insurancedata.json').toPromise().then(data => {
     this.insdata = data;
     this.loaddata(this.insdata);
     this.insuranceDatafilter = this.insdata;
    });
    this.resetForm();
  }
  loaddata(ins)
  {
    this.insuranceData=ins;
  }
  resetForm(form?:NgForm)
  {
    if(form!=null)
    {
      form.reset();
    }
  }
}
