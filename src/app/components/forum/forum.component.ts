import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ForumService } from '../../services/forum/forum.service';
import { Question } from '../../model/question';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  question:any="";
  question_model:any="";
  category:any="";
  forumData:any = [];
  questionsdata : any = [];
  forumFilter : any = [];
  dataobject : Object;
  originalData :any = [];
  constructor(private router: Router, private api:ForumService) { }

  ngOnInit(): void {
   // this.loaddata();
    this.getquestionsdata();
  }

  onSelect(data)
  {
    console.log(data);
    this.router.navigate(['/question',{id: data.questionId, category : data.category}]);
  }

  async dataChanged(newObj)
  {
    //this.loaddata();
    console.log(newObj);
    this.forumData = this.originalData;
    this.forumData = this.forumData.filter(option => option.category == this.category);
  }
  onSubmit(form:NgForm)
  {
    var ques = new Question();
    ques.title = form.form.value.question2;
    ques.description = form.form.value.question1;
    ques.user_by = 'vidip';
    ques.upvotes = 0;
    ques.category = form.form.value.category1;
    this.submitquestion(ques);
  }

  loaddata()
  {
   
  }

  async submitquestion(ques)
  {
    await this.api.submitquestion(ques);
    this.getquestionsdata();
  }

  getquestionsdata()
  {
    this.forumData = [];
    this.api.getQuestions()
    .subscribe(data => {
      for (const d of (data as any)) {
        this.forumData.push({
          questionId:d._id,
          question: d.title,
          description: d.description,
          askedby: d.user_by,
          votes: d.upvotes,
          category: d.category
        });
      }
      console.log(this.forumData);
      this.originalData = this.forumData;
      this.forumFilter = ['COVID','Dental','Ortho','Digestive','Eyes'];
    });
  }
}
