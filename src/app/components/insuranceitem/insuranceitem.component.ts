/* @author Vidip Malhotra <vidip.malhotra@dal.ca> */

import { Component, OnInit, ElementRef, HostListener} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InsuranceService } from '../../services/insurance/insurance.service';

@Component({
  selector: 'app-insuranceitem',
  templateUrl: './insuranceitem.component.html',
  styleUrls: ['./insuranceitem.component.css']
})
export class InsuranceitemComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private api: InsuranceService,private eRef: ElementRef) { }
  insuranceData: any = [];
  filteredinsuranceData: any = [];
  username: any = '';
  age: any = '';
  salary: any = '';
  gender: any = '';
  email: any = '';
  Index = -1;
  recommendation: any = '';
  insdata: any = [];
  interested_message:string;
  hidebutton = false;
  imageurl:any = 'usericon.png';
  error_message: any = '';
  userId:string = '';
  logincheck:string='';
  userData = [{Id:'',
    salary:'',
    age: '',
    profession: '',
    email:'',
    gender:''}]

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.email = this.route.snapshot.paramMap.get('email');
    this.age = this.route.snapshot.paramMap.get('age');
    this.gender = this.route.snapshot.paramMap.get('gender');
    this.salary = parseInt(this.route.snapshot.paramMap.get('salary'));
    if(localStorage.getItem('userId'))
    {
    this.loadinsurance(localStorage.getItem('userId'));
    }
    else{
      this.logincheck = "Please login to see your health plans."
    }
    this.loaduserdetails(localStorage.getItem('userId'));
    this.hidebutton = true;
    this.recommendation = 'Different health plans on left side of your profile are best filtered plans as per your profile. It would cover most of the health issues including COVID.'
  }

  filterData(username, email, age, gender, salary) {
    this.filteredinsuranceData = this.insuranceData.filter(option => option.agegroup == age);
  }

  loadinsurance(user_id)
  {
    this.api.getspecificInsurance(user_id)
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
            dentalcare:d.dentalcare
          });
        }
        this.filteredinsuranceData = this.insuranceData;
      }, (error) => {
        this.error_message = "Backend Error. Please try again after some time."
      });
  }

  interested(id){
    this.filterData = this.insuranceData.filter(option => option.Id == id);
    var icompany = this.filterData[0].insurancecompany;
    var ipremium = this.filterData[0].premium;
    var iinsurancename = this.filterData[0].insurancename;
    var message = "You have selected this "+icompany+" for your health plan. Your seleted healthplan is"+iinsurancename+" .Premium for this health plan is "+ipremium + "You will soon be contacted by one of our sales representative for the purchase request."; 
    this.interested_message = 'Thank you for showing interest in this health plan. You will soon be contacted over phone or by email';
    var email = this.userData[0].email;
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

  loaduserdetails(user_id)
  {
    this.api.getuserdetails(user_id)
      .subscribe(data => {
        this.userData = [];
        for (const d of (data as any)) {
          this.userData.push({
            Id: d._id,
            salary: d.salary,
            age: d.age,
            profession: d.profession,
            email:d.email,
            gender:d.gender
          });
        }
        if(this.userData[0].gender == 'Male')
        {
          this.imageurl = 'usericon.png'
        }
        else{
          this.imageurl = 'usericon2.png'
        }
      }, (error) => {
        this.error_message = "Backend Error. Please try again after some time."
      });
  }

  loaddata(ins) {
    this.insuranceData = ins;
    this.filterData(this.username, this.email, this.age, this.gender, this.salary);
  }
}
