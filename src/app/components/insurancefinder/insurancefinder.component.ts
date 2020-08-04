/* @author Vidip Malhotra <vidip.malhotra@dal.ca> */

import { Component, OnInit, ElementRef, HostListener} from '@angular/core';
import { NgForm } from '@angular/forms';
import { InsuranceService } from '../../services/insurance/insurance.service';
import { HttpClient } from '@angular/common/http';
import { userInsurance } from '../../model/userinsurance';

@Component({
  selector: 'app-insurancefinder',
  templateUrl: './insurancefinder.component.html',
  styleUrls: ['./insurancefinder.component.css']
})
export class InsurancefinderComponent implements OnInit {

  constructor(private api: InsuranceService, private http: HttpClient, private eRef: ElementRef) {

  }
  checkparam: boolean;
  checker = false;
  optional = true;
  submitted = true;
  hidebutton = false;
  error_message:any = '';
  fName: any = '';
  uemail: any = '';
  uphone: any = '';
  uprofession: any = '';
  ucategory: any = '';
  company: any = '';
  iname: any = '';
  Index = -1;
  uage: any = '';
  ugender: any = '';
  usalary: any = '';
  age: any = '';
  userlogin:string = '';
  data_error = '';
  premiums: any = '';
  insuranceData: any = [];
  insdata: any = [];
  filterData: any = []
  interested_message: string;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  insuranceDatafilter: any = [];
  userId:string;
  text:string='';
  log(x) {
  }
  checkEmail(email) {
  }

  dataChanged(newObj, key) {
    this.loaddata(this.insdata);
    this.insuranceData = this.insuranceData.filter(option => option.insurancecompany == this.company || option.insurancename == this.iname || option.agegroup == this.age || option.premium == this.premiums);
  }

  refresh()
  {
    this.getInsurances();
  }

 @HostListener('document:click', ['$event'])
 clicked_event(event) {
   if(this.eRef.nativeElement.contains(event.target)) {
   } else {
     setTimeout(() => {
      this.checklogin();
    }, 500);
   }
 }

 checklogin()
 {
    if(localStorage.getItem('userId'))
    {
      this.userId = localStorage.getItem('userId');
      this.optional = false;
      this.hidebutton = true;
    }
    else{
      this.userId = '';
      this.optional = true;
      this.hidebutton = false;
    }  
}
  ngOnInit(): void {
    this.getInsurances();
    if(this.userId == '')
    {
    this.userlogin = "User must be logged in to Submit";
    }
    if(localStorage.getItem('userId'))
    {
      this.loaduserdetails(localStorage.getItem('userId'));
      this.userlogin = "";
      this.hidebutton = true;
      this.userId = localStorage.getItem('userId');
    }
    this.resetForm();

  }
  loaddata(ins) {
    this.insuranceData = ins;
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
  }

  onSubmit(form: NgForm) {
    if (localStorage.getItem('name') && localStorage.getItem('userId')) {
    this.checker = true;
    this.submitted = false;
    this.optional = true;
      var ques = new userInsurance();
      ques.user_id = localStorage.getItem('userId');
      ques.salary = form.form.value.salary;
      ques.age = form.form.value.userage;
      ques.category = form.form.value.category;
      ques.profession = form.form.value.profession;
      ques.gender= form.form.value.gender;
      ques.email = form.form.value.userEmails;
      ques.phone = form.form.value.UserPhone;
      this.postuserdetails(localStorage.getItem('userId'),ques);
    }
    else{
      this.userlogin = "User must be logged in to Submit";
    }
  }

  interested(id){
    this.filterData = this.insuranceData.filter(option => option.Id == id);
    var icompany = this.filterData[0].insurancecompany;
    var ipremium = this.filterData[0].premium;
    var iinsurancename = this.filterData[0].insurancename;
    var message = "You have selected this "+icompany+" for your health plan. Your seleted healthplan is"+iinsurancename+" .Premium for this health plan is "+ipremium + "You will soon be contacted by one of our sales representative for the purchase request."; 
    this.interested_message = 'Thank you for showing interest in this health plan. You will soon be contacted over phone or by email';
    var email = localStorage.getItem('email');
    this.Index = id;
    setTimeout(() => {
      this.interested_message = '';
    }, 2500);
    this.sendEmail(email,message);
  }

  async sendEmail(email,message)
  {
    await this.api.sendemail(email,message).subscribe(data => {
    });;
  }
  getInsurances(){
    this.insuranceData = [];
    this.api.getAllInsurance()
      .subscribe(data => {
        for (const d of (data as any)) {
          this.insuranceData.push({
            Id: d._id,
            insurancecompany: d.company,
            type: d.category,
            insurancename: d.title,
            premium: d.price,
            insurancedetails: d.details,
            payduration: '',
            agegroup:d.age,
            dentalcare:d.dentalcare
          });
        }
        if(this.insuranceData.length < 1)
        {
          this.data_error = "No healthplans available yet."
        }
        this.insdata = this.insuranceData;
        this.insuranceDatafilter = this.insuranceData;
      }, (error) => {
        this.error_message = "Backend Error. Please try again after some time."
      });
  }

  loaduserdetails(user_id)
  {
    this.api.getuserdetails(user_id)
      .subscribe(data => {
        if(data[0] != undefined)
        {
          this.optional = false;
        }
      }, (error) => {
        this.error_message = "Backend Error. Please try again after some time."
      });
  }

  async postuserdetails(user_id,ques)
  { 
    await this.api.submituserdetails(user_id,ques);
  }
}
