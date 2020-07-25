/* @author Vidip Malhotra <vidip.malhotra@dal.ca> */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ForumService } from '../../services/forum/forum.service';
//Author: Vidip Malhotra
import { Question } from '../../model/question';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  question: any = "";
  question_model: any = "";
  category: any = "";
  answerstring: string;
  forumData: any = [];
  questionsdata: any = [];
  forumFilter: any = [];
  dataobject: Object;
  originalData: any = [];
  alert_message: string;
  page: number = 1;
  constructor(private router: Router, private api: ForumService) { }

  ngOnInit(): void {
    this.getquestionsdata();
  }

  onSelect(data) {
    this.router.navigate(['/question', { id: data.questionId, category: data.category }]);
  }

  //function to change data
  async dataChanged(newObj) {
    this.forumData = this.originalData;
    this.forumData = this.forumData.filter(option => option.category == this.category);
  }

  //function to submit
  onSubmit(form: NgForm) {
    if (localStorage.getItem('name') && localStorage.getItem('userId')) {
      this.alert_message = '';
      var ques = new Question();
      ques.title = form.form.value.question2;
      ques.description = form.form.value.question1;
      ques.user_by = localStorage.getItem('name');
      ques.user_id = localStorage.getItem('userId');
      ques.upvotes = 0;
      ques.category = form.form.value.category1;
      ques.answer = 0;
      this.submitquestion(ques);
    }
    else {
      this.alert_message = 'User is not logged in. Please LogIn To Continue';
      setTimeout(() => {
        this.alert_message = '';
      }, 2000);
    }
  }

  //function to refresh the data
  refresh() {
    this.getquestionsdata();
  }

  loaddata() {

  }

  //function to submit question
  async submitquestion(ques) {
    await this.api.submitquestion(ques);
    this.getquestionsdata();
  }

  //Function to get questions data
  getquestionsdata() {
    this.forumData = [];
    this.api.getQuestions()
      .subscribe(data => {
        for (const d of (data as any)) {
          this.forumData.push({
            questionId: d._id,
            question: d.title,
            description: d.description,
            askedby: d.user_by,
            votes: d.upvotes,
            category: d.category,
            answerval: d.answer
          });
        }
        this.originalData = this.forumData;
        this.forumFilter = ['COVID', 'Dental', 'Ortho', 'Digestive', 'Eyes'];
      });
  }
}
