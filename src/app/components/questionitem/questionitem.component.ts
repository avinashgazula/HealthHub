import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questionitem',
  templateUrl: './questionitem.component.html',
  styleUrls: ['./questionitem.component.css']
})
export class QuestionitemComponent implements OnInit {

  counter = 0;

  constructor(private route:ActivatedRoute) { }

  forumData:any=[
    {id:1,question:"What are some precautions for COVID, also natural home remedies for COVID",askedby:"Vidip",answer_count:"1",votes:200,category:"covid",answers:[1,3]},
    {id:2,question:"I have pain on right side of tooth ",askedby:"Vidip",answer_count:"2",votes:300,category:"ortho",answers:[2]},
    {id:3,question:"What are general home remedies for being fit",askedby:"Vidip",answer_count:"3",votes:1000,category:"dental",answers:[1,3]},
  ]

  allQuestions:any=[
    {id:1,question:"What are some precautions for COVID, also natural home remedies for COVID",askedby:"Vidip",answer_count:"1",votes:"200",category:"covid",answers:[1,3]},
    {id:2,question:"I have pain on right side of tooth ",askedby:"Vidip",answer_count:"2",votes:"300",category:"ortho",answers:['haldi','aa']},
    {id:3,question:"How to have fit leg muscles",askedby:"Vidip",answer_count:"3",votes:"1000",category:"dental",answers:['haldi','aa']},
  ]

  answers:any = [
    {id:1,answer:"You should always wear mask, and gloves when travlleing outside.Wash your hands often with soap and water for at least 20 seconds, especially after going to the bathroom; before eating; and after blowing your nose, coughing, or sneezing.Wash your hands often with soap and water for at least 20 seconds, especially after going to the bathroom; before eating; and after blowing your nose, coughing, or sneezing.",by:"Vidpppp",vote:0},
    {id:2,answer:"Brush your teeth at least twice a day with a fluoride-containing toothpaste. Preferably, brush after each meal and especially before going to bed.Clean between your teeth daily with dental floss or interdental cleaners, such as the Oral-B Interdental Brush, Reach Stim-U-Dent, or Sulcabrush.",by:"Vidipppp",vote:0},
    {id:3,answer:"golden milk is often used as a home remedy against colds. In fact, the yellow drink is touted for its immune-boosting properties.Test-tube studies suggest that curcumin has antibacterial, antiviral and antifungal properties which may help prevent and fight infections",by:"Vidipppp2",vote:0}
  ]
  question:any="";

  dataChanged(newObj)
  {

  }

  voted(id)
  {
    let item = this.answers.find(option => option.id == id);
    item.vote += 1;
  }

  votequestion(id)
  {
    let item = this.forumData.find(option => option.id == id);
    item.votes += 1;
  }
  onSubmit(form)
  {

  }


  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.forumData = this.forumData.filter(option => option.id == id);
    console.log(this.forumData);
    var ids = this.forumData[0].answers;
    this.answers = this.answers.filter(function(itm){
      return ids.indexOf(itm.id) > -1;
    });
    console.log(this.answers);
  }

}
