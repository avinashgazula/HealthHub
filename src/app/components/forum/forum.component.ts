import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  question:any="";
  category:any="";
  forumData:any = [];
  forumFilter = [
    {id:1,question:"What are some precautions for COVID, also home remedies for COVID",askedby:"Vidip",answer_count:"1",votes:"200",category:"covid",answers:['haldi','aa']},
    {id:2,question:"I have pain on right side of tooth ",askedby:"Vidip",answer_count:"2",votes:"300",category:"ortho",answers:['haldi','aa']},
    {id:3,question:"How to have fit leg muscles",askedby:"Vidip",answer_count:"3",votes:"1000",category:"dental",answers:['haldi','aa']},
  ];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loaddata();
  }

  onSelect(data)
  {
    this.router.navigate(['/question',data.id]);
  }

  dataChanged(newObj)
  {
    this.loaddata();
    this.forumData = this.forumData.filter(option => option.category == this.category);
  }
  onSubmit(form:NgForm)
  {
    this.forumData.push({'question':form.form.value.question,askedby:'Vidip',answer_count:'0',votes:'0',category:'',answers:[]});
  }

  loaddata()
  {
    this.forumData=[
      {id:1,question:"What are some precautions for COVID, also home remedies for COVID",askedby:"Vidip",answer_count:"1",votes:200,category:"covid",answers:['haldi','aa']},
      {id:2,question:"I have pain on right side of tooth ",askedby:"Vidip",answer_count:"2",votes:300,category:"ortho",answers:['haldi','aa']},
      {id:3,question:"How to have fit leg muscles",askedby:"Vidip",answer_count:"3",votes:1000,category:"dental",answers:['haldi','aa']},
    ]
  }
}
